from PIL import Image
from django import forms
from .models import Product, ProductDetails, Category, Subcategory, Brand, User, ProductUploads, ProductSizes
from django.forms import ModelForm, Textarea, TextInput, Select
from django.core.files import File

from django.forms.widgets import HiddenInput
#from registration.forms import RegistrationForm

GENDER_CHOICES = (
    ('M', 'For Him'),
    ('F', 'For Her'),
    ('U', 'Unisex'),
)
class ProductForm(forms.ModelForm):
    gender = forms.ChoiceField(widget=forms.Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22'}),choices=GENDER_CHOICES)

    class Meta:
        model = Product
        fields = ['title', 'gender', 'category', 'subcategory', 'brand']
        widgets = {
            'title' : TextInput(attrs={'placeholder': 'Product Title', 'class': 'sizefull s-text7 p-l-22 p-r-22 required'}),
            'category' : Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22'}),
            'subcategory' : Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22'}),
            'brand' : Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22'}),
            # 'user' : Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22'}),
        }

    def __init__(self, *args, **kwargs):
        super(ProductForm, self).__init__(*args, **kwargs)
        self.fields['category'].empty_label = 'Select Category'
        self.fields['subcategory'].empty_label = 'Select Category first'
        self.fields['subcategory'].queryset = Subcategory.objects.none()
        self.fields['brand'].empty_label = 'Select Brand'
        # self.fields['user'].empty_label = 'Select User'

        if 'category' in self.data:
            try:
                category_id = int(self.data.get('category'))
                self.fields['subcategory'].queryset = Subcategory.objects.filter(category_id=category_id).order_by('title')
            except (ValueError, TypeError):
                pass  # invalid input from the client; ignore and fallback to empty City queryset
        elif self.instance.pk:
            self.fields['subcategory'].queryset = self.instance.category.subcategory_set.order_by('title')

    def save(self, commit=True):
        product = super(ProductForm, self).save(commit=False)
        product.title = self.cleaned_data['title']
        product.gender = self.cleaned_data['gender']
        product.category = self.cleaned_data['category']
        product.subcategory = self.cleaned_data['subcategory']
        product.brand = self.cleaned_data['brand']
        # product.user = self.cleaned_data['user']

        if commit:
            product.save()
        return product

class ProductDetailsForm(forms.ModelForm):

    class Meta:
        model = ProductDetails
        fields = ['price', 'size', 'color', 'description', 'specifications']
        widgets = {
            'price': TextInput(attrs={'id':'js-color_picker','placeholder': 'Price', 'class': 'sizefull s-text7 p-l-22 p-r-22'}),
            'size': Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22 chosen-select-js','multiple':'multiple'}),
            'color': TextInput(attrs={'id':'js-color_code','placeholder': 'Color', 'class': 'sizefull s-text7 p-l-22 p-r-22'}),
            'description': Textarea(attrs={'placeholder': 'Product Description', 'class': 'dis-block s-text7 mero__textbox bo4 p-l-22 p-r-22 p-t-13 m-b-20','rows':'5'}),
            'specifications': Textarea(attrs={'placeholder': 'Product Specifications', 'class': 'dis-block s-text7 mero__textbox bo4 p-l-22 p-r-22 p-t-13 m-b-20','rows':'5'}),
        }

    def __init__(self, *args, **kwargs):
        super(ProductDetailsForm, self).__init__(*args, **kwargs)
        #self.fields['choose_color'].label = ''
        self.fields['size'].queryset = ProductSizes.objects.none()

    def save(self, commit=True):
        product_details = super(ProductDetailsForm, self).save(commit=False)
        product_details.price = self.cleaned_data['price']
        product_details.size = self.cleaned_data['size']
        product_details.color = self.cleaned_data['color']
        product_details.description = self.cleaned_data['description']
        product_details.specifications = self.cleaned_data['specifications']

        if commit:
            product_details.save()
        return product_details

class ProductUploadsForm(forms.ModelForm):
    x = forms.FloatField(widget=forms.HiddenInput())
    y = forms.FloatField(widget=forms.HiddenInput())
    width = forms.FloatField(widget=forms.HiddenInput())
    height = forms.FloatField(widget=forms.HiddenInput())
    product = forms.IntegerField(widget=forms.HiddenInput())


    class Meta:
        model = ProductUploads
        fields = ('file','x', 'y', 'width', 'height',)

    def __init__(self, *args, **kwargs):
        super(ProductUploadsForm, self).__init__(*args, **kwargs)
        self.fields['file'].widget.attrs.update({'class': 'hide_input'})


    def save(self, commit=True):
        uploads = super(ProductUploadsForm, self).save()

        x = self.cleaned_data['x']
        y = self.cleaned_data['y']
        w = self.cleaned_data['width']
        h = self.cleaned_data['height']

        x = int(round(x))
        y = int(round(y))
        w = int(round(w))
        h = int(round(h))

        image = Image.open(uploads.file)
        cropped_image = image.crop((x, y, w + x, h + y))
        #resized_image = cropped_image.thumbnail((200, 200), Image.ANTIALIAS)
        cropped_image.save(uploads.file.path)

        product = self.cleaned_data['product']
        uploads.product_id = Product.objects.get(id=product)
        uploads.filename = 'abhi.jpg'
        uploads.filetype = 1

        if commit:
            uploads.save()
        return uploads
        # returning the uploaded file name    
        #return str(uploads.file)

