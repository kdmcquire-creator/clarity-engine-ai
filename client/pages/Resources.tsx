              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <Link key={resource.id} href={`/resource/${resource.id}`} className="block no-underline text-inherit">
                <Card className="p-6 bg-white border-slate-200 hover:shadow-lg hover:border-blue-300 transition group cursor-pointer flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                      {resource.type.replace("-", " ").toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500">{resource.readTime} min read</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-2">
                    {resource.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <User className="h-4 w-4" />
                      <span>{resource.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(resource.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
            </Link>
          ))}
        </div>
      </section>
