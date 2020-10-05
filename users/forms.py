# from django import forms
# from .models import User, Userdetails, BillingDetails
# from lookups.models import Country, State, District
# from django.contrib.auth.forms import UserCreationForm
# from django.forms import Select
#
# class UserForm(forms.ModelForm):
#     email = forms.EmailField(widget=forms.TextInput(attrs={'placeholder':'Email ID','class': 'sizefull s-text7 p-l-22 p-r-22'}))
#     password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder':'Password','class': 'sizefull s-text7 p-l-22 p-r-22'}))
#
#     class Meta:
#         model = User
#         fields = ['email', 'password']
#
# class SignUpForm(UserCreationForm):
#     user_group = [(2,'Retailer'),(3,'Customer')]
#     name = forms.CharField(widget=forms.TextInput(attrs={'placeholder':'Name', 'class': 'sizefull s-text7 p-l-22 p-r-22'}))
#     email = forms.EmailField(widget=forms.TextInput(attrs={'placeholder':'Email ID', 'class': 'sizefull s-text7 p-l-22 p-r-22'}))
#     password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder':'Password', 'class': 'sizefull s-text7 p-l-22 p-r-22'}))
#     password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder':'Retype Password', 'class': 'sizefull s-text7 p-l-22 p-r-22'}))
#     group = forms.ChoiceField(choices=user_group, widget=forms.RadioSelect())
#
#     class Meta:
#         model = User
#         fields = ['name','email','group']
#
#     def save(self, commit=True):
#         user = super(SignUpForm, self).save(commit=False)
#         user.first_name = self.cleaned_data['name']
#         user.email = self.cleaned_data['email']
#         user.username = self.cleaned_data['email']
#         user.group = self.cleaned_data['group']
#
#         if commit:
#             user.save()
#             return user
#
# class EditForm(forms.ModelForm):
#     class Meta:
#         model = Userdetails
#         fields = ['first_name','last_name','phone_no']
#
# class BillingDetailForm(forms.ModelForm):
#     def __init__(self, *args, **kwargs):
#         super(BillingDetailForm, self).__init__(*args, **kwargs)
#         self.fields['state'].empty_label = 'Select Country first'
#
#     class Meta:
#         model = BillingDetails
#         # country = Country.objects.values_list('id','name')
#         state = State.objects.values_list('id','name')
#         # raise Exception(state)
#         fields = ['state','district','city','ward_no','house_no','landmark']
#         widgets = {
#             # 'country' : Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22'},choices=country),
#             'state' : Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22'}, choices=state),
#             'district' : Select(attrs={'class': 'sizefull s-text7 p-l-22 p-r-22'}),
#         }