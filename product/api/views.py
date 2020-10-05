from django.http import JsonResponse, Http404
from product.models import Category, Subcategory, Product, ProductDetails, ProductSizes, Brand, ProductUploads
from django.views.decorators.csrf import csrf_exempt
from product.api.serializers import ProductSerializer, ProductDetailsSerializer, UserProductSerializer
from rest_framework import generics, viewsets
import json
from PIL import Image
import os
from django.core import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

class ProductViewset(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

class ProductDetailsViewset(viewsets.ModelViewSet):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductDetailsSerializer

class UserProduct(APIView):
	def get_object(self, id):
		try:
			return Product.objects.filter(user_id=id)
		except Product.DoesNotExist:
			raise Http404

	def get(self, request, id, format=None):
		object = self.get_object(id)
		serializers = UserProductSerializer(object, many=True)
		#raise Exception(object.values())
		return Response(serializers.data)

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
            filename = 'media/product/product_' + str(uploads.id) + '.jpg'
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
                'msg': msg
            }
        else:
            data = {
                'is_valid': False,
                'msg': max_upload_msg
            }
    else:
        data = {'is_valid': False}
    return JsonResponse(data)

def fetch_productinfo(request,id):
	product_info = Product.objects.filter(pk=id).first()
	product = serializers.serialize('json', [product_info])
	data = {
		'product': product,
	}
	return JsonResponse(data)