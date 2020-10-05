from django.contrib import admin
from .models import Category

# Hide the slug field from admin form as it will be automatically created when adding category
class CategoryAdmin(admin.ModelAdmin):
    exclude = ('slug',)
admin.site.register(Category, CategoryAdmin)

# Register your models here.


