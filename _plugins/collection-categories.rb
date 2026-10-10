# frozen_string_literal: true

# Generates /categories/<name>/ and /tags/<name>/ pages from posts, research
# and projects. Replaces jekyll-archives (which only handles posts).
module CollectionArchives
  COLLECTIONS = %w[posts research projects].freeze

  # front matter key => [layout, url folder, page type]
  TYPES = {
    'categories' => ['category', 'categories', 'category'],
    'tags'       => ['tag',      'tags',       'tag']
  }.freeze

  class ArchivePage < Jekyll::PageWithoutAFile
    def initialize(site, name, docs, layout, folder, type)
      super(site, site.source, File.join(folder, Jekyll::Utils.slugify(name)), 'index.html')
      self.content = ''
      self.data = {
        'layout' => layout,
        'type'   => type,
        'title'  => name,
        'posts'  => docs
      }
    end
  end

  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      TYPES.each do |key, (layout, folder, type)|
        groups = Hash.new { |hash, k| hash[k] = [] }

        COLLECTIONS.each do |label|
          collection = site.collections[label]
          next unless collection

          collection.docs.each do |doc|
            Array(doc.data[key]).map(&:to_s).each do |name|
              groups[name] << doc
            end
          end
        end

        groups.each do |name, docs|
          sorted = docs.sort_by { |doc| doc.date || Time.at(0) }.reverse
          site.pages << ArchivePage.new(site, name, sorted, layout, folder, type)
        end
      end
    end
  end
end
