from django.http import JsonResponse, Http404
from store.models import Store
from store.api.serializers import StoreSerializer
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.views import APIView

class StoreViewset(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class UserStore(APIView):
	def get_object(self, id):
		try:
			return Store.objects.filter(user_id=id)
		except Store.DoesNotExist:
			raise Http404

	def get(self, request, id, format=None):
		object = self.get_object(id)
		serializers = StoreSerializer(object, many=True)
		#raise Exception(object.values())
		return Response(serializers.data)
