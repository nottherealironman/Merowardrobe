from django import forms
from .models import Store
from django.forms import ModelForm, Textarea, TextInput, Select

class StoreForm(forms.ModelForm):
    
    class Meta:
        model = Store
        fields = ('name','pan','phone', 'location', 'available_items', 'keywords','description','pan_uploads',)
        widgets = {
            'name': TextInput(attrs={'placeholder': 'Store Name', 'class': 'sizefull s-text7 p-l-22 p-r-22','required': True}),
            'pan': TextInput(attrs={'placeholder': 'PAN of your store', 'class': 'sizefull s-text7 p-l-22 p-r-22','required': True}),
            'phone': TextInput(attrs={'placeholder': 'Contact number', 'class': 'sizefull s-text7 p-l-22 p-r-22','required': True}),
            'location': TextInput(attrs={'placeholder': 'Store location', 'class': 'sizefull s-text7 p-l-22 p-r-22','required': True}),
            'available_items': TextInput(attrs={'placeholder': 'What do you sell? (Ex: T-shirt, Jeans)', 'class': 'sizefull s-text7 p-l-22 p-r-22','required': True}),
            'keywords': TextInput(attrs={'placeholder': 'Keywords for your store (Ex: Thanka store in Thamel)', 'class': 'sizefull s-text7 p-l-22 p-r-22','required': True}),
            'description': Textarea(attrs={'placeholder': 'Store Description',
                                              'class': 'dis-block s-text7 mero__textbox bo4 p-l-22 p-r-22 p-t-13 m-t-20',
                                              'rows': '5','required': True}),

            # 'user': Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22'}),
        }

    def __init__(self, *args, **kwargs):
        super(StoreForm, self).__init__(*args, **kwargs)
        self.fields['pan_uploads'].widget.attrs.update({'class': 'hide_input'})
        self.fields['phone'].empty_label = None

    def save(self, commit=True):
        store = super(StoreForm, self).save(commit=False)
        store.name = self.cleaned_data['name']
        store.pan = self.cleaned_data['pan']
        store.phone = self.cleaned_data['phone']
        store.location = self.cleaned_data['location']
        store.available_items = self.cleaned_data['available_items']
        store.available_items = self.cleaned_data['available_items']
        store.description = self.cleaned_data['description']
        #store.user = self.cleaned_data['user']

        if commit:
            store.save()
        return store