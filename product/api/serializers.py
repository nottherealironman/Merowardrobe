from rest_framework import serializers
from product.models import Product, ProductDetails

class ProductDetailsSerializer(serializers.ModelSerializer):
	class Meta:
		model = ProductDetails
		fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
	category_name = serializers.CharField(source='category.title', read_only=True)
	brand_name = serializers.CharField(source='brand.title', read_only=True)
	producdetails = ProductDetailsSerializer(many=False, read_only=True)

	class Meta:
		model = Product
		fields = ('id','title','gender','category','subcategory','brand','user','category_name','brand_name','producdetails')

class UserProductSerializer(serializers.ModelSerializer):
	category_name = serializers.CharField(source='category.title', read_only=True)
	brand_name = serializers.CharField(source='brand.title', read_only=True)
	producdetails = ProductDetailsSerializer(many=False, read_only=True)

	class Meta:
		model = Product
		fields = ('id','title','gender','category_id','subcategory_id','brand_id','user_id','category_name','brand_name','producdetails')

