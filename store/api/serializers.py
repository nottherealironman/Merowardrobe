from rest_framework import serializers
from store.models import Store

class StoreSerializer(serializers.ModelSerializer):

	class Meta:
		model = Store
		fields = ('name','pan','phone', 'location', 'available_items', 'keywords','description','pan_uploads','user')