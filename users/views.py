from django.shortcuts import render, redirect, get_object_or_404
# from .forms import UserForm, SignUpForm, EditForm, BillingDetailForm
from .backends import EmailBackends
from django.contrib.auth import login, logout
from .models import User, Userdetails, BillingDetails
from lookups.models import District, State
from users.serializers import UserSerializer
from rest_framework import generics
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer,SignupSerializer, UserSerializerWithToken
from django.http import JsonResponse

# def index(request):
#     if request.user.is_authenticated:
#         return redirect('/users/dashboard')
#
#     form = UserForm(request.POST or None)
#     signup_form = SignUpForm(request.POST or None)
#     context = {
#         "form": form,
#         "signup_form": signup_form,
#     }
#     return render(request, 'users/login.html', context)
#
# def login_user(request):
#     if request.method == "POST":
#         username = request.POST['email']
#         password = request.POST['password']
#         eb = EmailBackends()
#         user = eb.authenticate(username=username, password=password)
#         if user is not None:
#             if user.is_active:
#                 login(request,user)
#                 if user.group == 2:
#                     return redirect('/product/')
#                 elif user.group == 3:
#                     return redirect('/users/dashboard/')
#                 return render(request, 'home/index.html')
#             else:
#                return render(request, 'users/login.html', {'error_message': 'Your account has been disabled'})
#         else:
#             return render(request, 'users/login.html', {'error_message': 'Invalid login'})
#
#     form = UserForm(request.POST or None)
#     signup_form = SignUpForm(request.POST or None)
#     context = {
#         "form": form,
#         "signup_form": signup_form,
#     }
#     return render(request, 'users/login.html',context)
#
# def logout_user(request):
#     logout(request)
#     return redirect('/home')
#
# def signup_user(request):
#     if request.method == "POST":
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             #raise Exception(user.id)
#             user_detail = Userdetails(user_id=user.id,status=1)
#             user_detail.save()
#             login(request,user)
#             if user.group == 2:
#                 return redirect('/product')
#             elif user.group == 3:
#                 return redirect('/users/dashboard')
#             return render(request, 'home/index.html')
#         else:
#             raise Exception(form.errors)
#     else:
#         # raise Exception("here")
#         form = UserForm(request.POST or None)
#         signup_form = SignUpForm(request.POST or None)
#         args = {
#             "form": form,
#             "signup_form": signup_form,
#         }
#         return render(request, 'users/login.html',args)
#
# def user_dashboard(request):
#     user_detail = get_object_or_404(Userdetails, user_id=request.user.id)
#     form = EditForm(instance=user_detail)
#     try:
#         billing_detail = BillingDetails.objects.get(user_id=request.user.id)
#         district = District.objects.get(id=billing_detail.district).name
#         state = State.objects.get(id=billing_detail.state).name
#         billing_detail_form = BillingDetailForm(instance=billing_detail)
#         context = {
#             "form" : form,
#             "state" : state,
#             "district": district,
#             "user_detail" : user_detail,
#             "billing_detail" : billing_detail,
#             "billing_detail_form" : billing_detail_form
#         }
#     except BillingDetails.DoesNotExist:
#         billing_detail_form = BillingDetailForm(request.POST or None)
#         billing_detail = None
#         context = {
#             "form" : form,
#             "user_detail" : user_detail,
#             "billing_detail_form" : billing_detail_form
#         }
#     return render(request, 'users/dashboard.html', context)
#
# def edit_user(request,id=None):
#     if id:
#         user = get_object_or_404(Userdetails, user_id=id)
#         if request.method == "POST":
#             form = EditForm(request.POST)
#             if form.is_valid():
#                 user.first_name = form.cleaned_data['first_name']
#                 user.last_name = form.cleaned_data['last_name']
#                 user.phone_no = form.cleaned_data['phone_no']
#                 user.save()
#                 return redirect('/users/dashboard')
#
# def billing_detail(request, id=None):
#     if request.method == "POST":
#         if id:
#             #edit
#             bd = get_object_or_404(BillingDetails, user_id=id)
#             form = BillingDetailForm(request.POST)
#             if form.is_valid():
#                 bd.state = form.cleaned_data['state']
#                 bd.district = form.cleaned_data['district']
#                 bd.city = form.cleaned_data['city']
#                 bd.ward_no = form.cleaned_data['ward_no']
#                 bd.house_no = form.cleaned_data['house_no']
#                 bd.landmark = form.cleaned_data['landmark']
#                 bd.save()
#                 return redirect('/users/dashboard/')
#             else:
#                 raise Exception('Invalid')
#
#         else:
#             #create
#             form = BillingDetailForm(request.POST)
#             if form.is_valid():
#                 bd = BillingDetails()
#                 bd.state = form.cleaned_data['state']
#                 bd.user_id = request.user.id
#                 bd.district = form.cleaned_data['district']
#                 bd.city = form.cleaned_data['city']
#                 bd.ward_no = form.cleaned_data['ward_no']
#                 bd.house_no = form.cleaned_data['house_no']
#                 bd.landmark = form.cleaned_data['landmark']
#                 bd.save()
#                 return redirect('/users/dashboard/')
#     else:
#         if request.id:
#             billing_detail = BillingDetails.objects.get(user_id=request.user.id)
#             billing_detail_form = BillingDetailForm(instance=billing_detail)
#             context = {
#                 "billing_detail_form":billing_detail_form,
#             }
#         else:
#             billing_detail_form = BillingDetailForm(request.POST)
#             context = {
#                 "billing_detail_form":billing_detail_form,
#             }
#         return render(request, 'users/dashboard.html', context)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserSignup(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            data_serializer = UserSerializerWithToken(instance)
            return Response(data_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer