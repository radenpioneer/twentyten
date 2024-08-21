import { config, fields, collection, singleton } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local'
  },
  collections: {
    posts: collection({
      label: 'Artikel',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Judul',
            validation: { isRequired: true, length: { max: 160 } }
          },
          slug: {
            label: 'Permalink Slug'
          }
        }),
        date: fields.date({
          label: 'Tanggal Artikel',
          description: 'Tanggal terbit artikel.',
          defaultValue: { kind: 'today' },
          validation: {
            isRequired: true
          }
        }),
        subtitle: fields.text({
          label: 'Subtitel',
          description: 'Judul tambahan, jika diperlukan.',
          multiline: true,
          validation: { isRequired: false, length: { max: 160 } }
        }),
        description: fields.text({
          label: 'Deskripsi Artikel',
          description:
            'Deskripsi Artikel untuk ditampilkan di metadata. Jika tidak ada maka akan diambil dari paragraf pertama.',
          multiline: true,
          validation: { isRequired: false, length: { max: 160 } }
        }),
        tags: fields.array(
          fields.slug({
            name: {
              label: 'Nama Tag',
              description: 'Judul Tag Anda',
              validation: {
                isRequired: true,
                length: {
                  max: 64
                }
              }
            },
            slug: {
              label: 'Permalink Tag'
            }
          }),
          {
            label: 'Tag Artikel',
            description:
              'Tambahkan tag untuk mempermudah pencarian dan indeks artikel.',
            itemLabel: (prop) => prop.value.name
          }
        ),
        lang: fields.select({
          label: 'Bahasa Artikel',
          description: 'Bahasa artikel ini.',
          options: [
            {
              label: '🇮🇩 Bahasa Indonesia',
              value: 'id'
            },
            {
              label: '🇺🇸 English',
              value: 'en'
            }
          ],
          defaultValue: 'id'
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Tandai post ini sebagai draft (belum selesai)',
          defaultValue: true
        }),
        image: fields.image({
          label: 'Gambar Utama',
          description: 'Gambar utama artikel untuk ditampilkan pada header.',
          directory: 'src/assets/posts',
          publicPath: '~/assets/posts',
          validation: {
            isRequired: false
          }
        }),
        content: fields.mdx({
          label: 'Isi Artikel',
          extension: 'md',
          options: {
            image: {
              directory: 'src/assets/posts',
              publicPath: '~/assets/posts',
              schema: true
            }
          }
        })
      }
    }),

    pages: collection({
      label: 'Halaman',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: 'Judul',
            validation: { isRequired: true, length: { max: 160 } }
          },
          slug: {
            label: 'Permalink Slug'
          }
        }),
        description: fields.text({
          label: 'Deskripsi Halaman',
          description:
            'Deskripsi Halaman untuk ditampilkan di metadata. Jika tidak ada maka akan diambil dari paragraf pertama.',
          multiline: true,
          validation: { isRequired: false, length: { max: 160 } }
        }),
        image: fields.image({
          label: 'Gambar Utama',
          description: 'Gambar utama halaman untuk ditampilkan pada header.',
          directory: 'src/assets/pages',
          publicPath: '~/assets/pages',
          validation: {
            isRequired: false
          }
        }),
        content: fields.mdx({
          label: 'Isi Halaman',
          extension: 'md',
          options: {
            image: {
              directory: 'src/assets/pages',
              publicPath: '~/assets/pages',
              schema: true
            }
          }
        })
      }
    }),

    menu: collection({
      label: 'Menu',
      slugField: 'title',
      path: 'src/content/menu/*',
      format: 'json',
      schema: {
        $schema: fields.ignored(),
        title: fields.slug({
          name: {
            label: 'Nama Menu',
            validation: { isRequired: true, length: { max: 64 } }
          }
        }),
        description: fields.text({
          label: 'Deskripsi Menu',
          description: 'Deskripsi menu.',
          multiline: true,
          validation: { isRequired: false, length: { max: 160 } }
        }),
        items: fields.blocks(
          {
            page: {
              label: 'Halaman',
              schema: fields.relationship({
                label: 'Halaman',
                collection: 'pages'
              }),
              itemLabel: (prop) => `Halaman ${prop.value}`
            },

            link: {
              label: 'Tautan Eksternal',
              schema: fields.object({
                title: fields.text({
                  label: 'Nama Tautan',
                  validation: {
                    isRequired: true,
                    length: {
                      max: 64
                    }
                  }
                }),
                url: fields.url({
                  label: 'Alamat Tautan',
                  validation: {
                    isRequired: true
                  }
                }),
                icon: fields.image({
                  label: 'Icon',
                  directory: 'src/assets/menu',
                  publicPath: '~/assets/menu',
                  validation: {
                    isRequired: false
                  }
                })
              }),
              itemLabel: (prop) => prop.fields.title.value
            }
          },
          {
            label: 'Daftar isian menu.'
          }
        )
      }
    })
  },

  singletons: {
    site: singleton({
      label: 'Site Settings',
      path: 'src/content/site/site',
      format: 'json',
      schema: {
        $schema: fields.ignored(),
        title: fields.text({
          label: 'Nama Situs',
          validation: { isRequired: true, length: { max: 64 } }
        }),
        slogan: fields.text({
          label: 'Slogan Situs',
          description: 'Slogan situs untuk ditampilkan pada header.',
          validation: { isRequired: true, length: { max: 160 } }
        }),
        description: fields.text({
          label: 'Deskripsi Situs',
          description: 'Deskripsi situs utama untuk ditampilkan di metadata.',
          multiline: true,
          validation: { isRequired: true, length: { max: 160 } }
        }),
        lang: fields.select({
          label: 'Bahasa Situs',
          description: 'Bahasa utama situs.',
          options: [
            {
              label: '🇮🇩 Bahasa Indonesia',
              value: 'id'
            },
            {
              label: '🇺🇸 English',
              value: 'en'
            }
          ],
          defaultValue: 'id'
        }),
        image: fields.image({
          label: 'Gambar Utama',
          description: 'Gambar utama situs.',
          directory: 'src/assets/site',
          publicPath: '~/assets/site',
          validation: {
            isRequired: true
          }
        }),
        favicon: fields.image({
          label: 'Icon Situs',
          description:
            'Gambar icon situs, untuk ditampilkan pada system operasi Anda.',
          directory: 'public',
          publicPath: '',
          validation: {
            isRequired: true
          }
        })
      }
    })
  }
})
