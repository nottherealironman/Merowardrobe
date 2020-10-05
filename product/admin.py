from django.contrib import admin
from .models import Category, Brand, Product, Subcategory, ProductSizes

# Hide the slug field from admin form as it will be automatically created when adding category
class CategoryAdmin(admin.ModelAdmin):
    exclude = ('slug',)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Subcategory)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(ProductSizes)
