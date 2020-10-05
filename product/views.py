from django.shortcuts import render, redirect, get_object_or_404
from .forms import ProductForm, ProductDetailsForm, ProductUploadsForm
from django.http import JsonResponse, Http404
from.models import Category, Subcategory, Product, ProductUploads, ProductDetails, ProductSizes, Brand
from django.views.decorators.csrf import csrf_exempt
from product.api.serializers import ProductSerializer, ProductDetailsSerializer, UserProductSerializer
from rest_framework import generics, viewsets
import json
from PIL import Image
import os
from django.core import serializers
from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
def index(request):
	if request.user.is_authenticated and request.user.group == 2:
		products = Product.objects.filter(user_id=request.user.id)
		data = {
			'products' : products,
		}
		return render(request, 'product/index.html', data)
	else:
		return redirect('/')

# Both for create and update
def create_product(request):
	if request.user.is_authenticated and request.user.group == 2:
		if request.method == "POST":
			product_form = ProductForm(request.POST or None)
			if product_form.is_valid():
				try:
					product_id = request.POST.get('product')
					instance = Product.objects.get(id=product_id)
				except (ValueError, Product.DoesNotExist) as e:
					instance = None

				if instance is not None:
					product_form = ProductForm(request.POST or None, instance=instance)

				product = product_form.save(commit=False)
				product.user_id = request.user.id
				product.save()
				data = {
					'is_valid': True,
					'product' : product.id
				}
				return JsonResponse(data)
			else:
				raise Exception(product_form.errors)
		else:
			product = ProductForm()
			product_details = ProductDetailsForm()
			product_uploads = ProductUploadsForm()
			context = { 'product' : product, 'product_details': product_details, 'product_uploads': product_uploads}
			return render(request, 'product/create_product.html',context)
	else:
		return redirect('/')

# Both for create and update
def add_product_details(request):
	if request.method == "POST":
		productdetails_form = ProductDetailsForm(request.POST or None)
		if productdetails_form.is_valid():
			product_id = request.POST.get('product')

			#check if the user has the authority to add or update product details
			auth_check = Product.check_product_auth(product_id, request.user.id)
			if auth_check:
				try:
					instance = ProductDetails.objects.get(product_id=product_id)
				except ProductDetails.DoesNotExist:
					instance = None

				# If instance is object then => Update
				# If instance is None then => Create
				if instance is not None:
					# For update, need to pass the second paramater, which is instance of object
					productdetails_form = ProductDetailsForm(request.POST or None, instance=instance)

				productdetails = productdetails_form.save(commit=False)
				productdetails.product_id  = Product.objects.get(id=product_id)
				productdetails.save()
				data = {
	                'is_valid' : True,
	                'product': product_id
	            }
			else:
				data = {
					'is_valid' : False,
					'msg' : 'Sorry, you do not have permission to update.'
				}
			return JsonResponse(data)
		else:
			raise Exception(productdetails_form.errors)
	else:
		product = ProductForm()
		product_details = ProductDetailsForm()

		context = {
			'product': product,
			'product_details': product_details
		}
		return render(request, 'product/create_product.html', context)

def load_subcategories(request):
	category_id = request.GET.get('category')
	prod_subcategories = Subcategory.objects.filter(category_id=category_id).order_by('title')
	prod_sizes = ProductSizes.objects.filter(category_id=category_id).order_by('created_on')

	subcatgegories = {}
	for sub in prod_subcategories:
		subcatgegories[sub.id] = sub.title

	sizes = {}
	for size in prod_sizes:
		sizes[size.id] = size.title

	data = {
		'subcategories' : subcatgegories,
		'sizes' : sizes
	}
	#raise Exception(data)
	return JsonResponse(data)

def fetch_data(request):
	prod_categories = Category.objects.all()
	prod_subcategories = Subcategory.objects.all()
	prod_sizes = ProductSizes.objects.all()
	prod_brands = Brand.objects.all()

	categories = {}
	for cat in prod_categories:
		categories[cat.id] = cat.title

	subcategories = {}
	for sub in prod_subcategories:
		subcategories[sub.id] = {
			'title': sub.title,
			'category':sub.category.id,
			'category_title':sub.category.title
			}

	sizes = {}
	for size in prod_sizes:
		sizes[size.id] = {
			'id' : size.id,
			'title' :size.title,
			'category':size.category.id,
			'category_title':size.category.title
			}

	brands = {}
	for brand in prod_brands:
		brands[brand.id] = brand.title

	data = {
		'categories' : categories,
		'subcategories' : subcategories,
		'sizes' : sizes,
		'brands' : brands
	}
	#raise Exception(data)
	return JsonResponse(data)

def fetch_productinfo(request,id):
	product_info = Product.objects.filter(pk=id).first()
	product = serializers.serialize('json', [product_info])
	data = {
		'product': product,
	}
	return JsonResponse(data)

@csrf_exempt
# def product_uploads(request):
# 	if request.method == 'POST':
# 		form = ProductUploadsForm(request.POST, request.FILES)
# 		if form.is_valid():
# 			product_id = request.POST.get('product')
# 			total_prod = ProductUploads.objects.filter(product_id=product_id).count()
# 			# Allowing user to upload only upto 5 images
# 			max_upload_msg = 'You can only uploads upto 5 images for a product.'
# 			if total_prod < 5:
# 				uploads = form.save()

# 				filename = str(uploads.file)
# 				# Increment the count after successful file upload
# 				msg = ''
# 				total_prod += 1
# 				if total_prod == 5:
# 					msg = max_upload_msg;
# 				data = {
# 					'is_valid': True,
# 					'filename': filename,
# 					'upload_id': uploads.id,
# 					'total': total_prod,
# 					'msg' : msg
# 				}
# 			else:
# 				data = {
# 					'is_valid': False,
# 					'msg' : max_upload_msg
# 				}
# 		else:
# 			data = {'is_valid': False}
# 		return JsonResponse(data)

# def remove_product_uploads(request):
# 	if request.method == 'POST':
# 		upload_id = request.POST.get('upload_id')
# 		if upload_id is not None:
# 			try:
# 				uploads = ProductUploads.objects.get(id=upload_id)
# 			except ProductUploads.DoesNotExist:
# 				uploads = None
# 			if uploads is not None and uploads.delete():
# 				data = {
# 					'is_valid' : True,
# 					'msg' : 'Product Image successfully removed',
# 				}
# 		else:
# 			data = {
# 				'is_valid' : False,
# 			}
# 		return  JsonResponse(data)

# def verify_product_uploads(request):
# 	if request.method == 'POST':
# 		product_id = request.POST.get('product_id')
# 		try:
# 			total = ProductUploads.objects.filter(product_id=product_id).count()
# 		except ProductUploads.DoesNotExist:
# 			total = 0

# 		if total > 0:
# 			data = {
# 				'is_valid': True,
# 				'msg' : 'Successfully submitted',
# 			}
# 		else:
# 			data = {
# 				'is_valid' : False,
# 				'msg': 'Please upload images before you submit.'
# 			}
# 		return JsonResponse(data)

# def update_product(request, id):
# 	if request.user.is_authenticated and request.user.group == 2:
# 		#id == 44
# 		product_data = get_object_or_404(Product, id=id)
# 		product = ProductForm(instance=product_data)
# 		product_details_data = get_object_or_404(ProductDetails, product_id=id)
# 		product_details = ProductDetailsForm(instance=product_details_data)
# 		product_uploads = ProductUploadsForm()

# 		# converting string to array and then array of string to array of int
# 		prod_sizes = list(map(int, product_details_data.size.split(',')))
# 		sizes = ProductSizes.objects.filter(category=product_data.category)

# 		try:
# 			uploads = ProductUploads.objects.filter(product_id=id)
# 		except ProductUploads.DoesNotExist:
# 			uploads = None
# 		# raise Exception(uploads)
# 		context = {
# 			'product': product,
# 			'product_details': product_details,
# 			'product_uploads': product_uploads,
# 			'product_data': product_data,
# 			'uploads': uploads,
# 			'sizes' : sizes,
# 			'prod_sizes' : prod_sizes,
# 		}
# 		return render(request, 'product/create_product.html', context)

# 	else:
# 		return redirect('/')

# def remove_product(request):
# 	if request.user.is_authenticated and request.user.group == 2:
# 		if request.method == "POST":
# 			product_id = request.POST.get('product_id')
# 			auth_check = Product.check_product_auth(product_id, request.user.id)
# 			if auth_check:
# 				try:
# 					product = Product.objects.get(id=product_id)
# 				except Product.DoesNotExist:
# 					product = None
# 				if product is not None and product.delete():
# 					data = {
# 						'is_valid' : True,
# 						'msg' : 'Product successfully removed',
# 					}
# 			else:
# 				data = {
# 					'is_valid': False,
# 					'msg': 'Sorry, you do not have permission to remove this product.'
# 				}
# 		return JsonResponse(data)


# Image Upload API

def product_uploads(request):
	if request.method == 'POST':

		product_id = request.POST.get('product')
		total_prod = ProductUploads.objects.filter(product_id=product_id).count()
		# Allowing user to upload only upto 5 images
		max_upload_msg = 'You can only uploads upto 5 images for a product.'
		if total_prod < 5:
			x = request.POST.get('x')
			y = request.POST.get('y')
			w = request.POST.get('width')
			h = request.POST.get('height')

			x = int(round(float(x)))
			y = int(round(float(y)))
			w = int(round(float(w)))
			h = int(round(float(h)))

			file = request.FILES['file']
			image = Image.open(file)
			cropped_image = image.crop((x, y, w + x, h + y))
			uploads = ProductUploads();
			cropped_image.save(uploads.file.path)

			uploads.product_id = Product.objects.get(id=product_id)
			uploads.filetype = 1
			uploads.save()

			# Rename the default name to custom filename
			filename = 'media/product/product_'+str(uploads.id)+'.jpg'
			os.rename(uploads.file.path, filename)
			uploads.filename = filename
			uploads.save()
			# Increment the count after successful file upload
			msg = 'Image uploaded successfully!'
			total_prod += 1
			if total_prod == 5:
				msg = max_upload_msg;
			data = {
					'is_valid': True,
					'filename': filename,
					'upload_id': uploads.id,
					'total': total_prod,
					'msg' : msg
			}
		else:
			data = {
				'is_valid': False,
				'msg' : max_upload_msg
			}
	else:
		data = {'is_valid': False}
	return JsonResponse(data)

# class ProductUploadsView(View):
#     def get(self, request):
#         uploads = ProductUploads.objects.all()
#         return render(self.request, 'product/index.html', {'uploads': uploads})

#     def post(self, request):
#         if request.method == 'POST':
#             form = ProductUploadsForm(self.request.POST, self.request.FILES)
#             if form.is_valid():
#                 uploads = form.save(commit=False)
#                 # image = request.FILES['file']
#                 # raise Exception(image)
#                 # uploads.filename = 'abc.jpg'
#                 # uploads.file = base64.b64decode(image.replace('data:image/jpeg;base64,',''))
#                 product = request.POST.get('product')
#                 uploads.product_id = Product.objects.get(id=7)
#                 #uploads.product = request.POST.get('product')
#                 uploads.filename = 'abhi.jpg'
#                 uploads.filetype = '1'
#                 form.save()
#                 data = {'is_valid': True}
#             else:
#                 data = {'is_valid': False}
#             return JsonResponse(data)


