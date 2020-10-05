from django.db import models

class Country(models.Model):
    iso = models.CharField(blank=False, max_length=3)
    name = models.CharField(blank=False, max_length=50)
    nicename = models.CharField(blank=False, max_length=50)
    iso3 = models.CharField(null=True, max_length=3)
    numcode = models.CharField(null=True, max_length=5)
    phonecode = models.CharField(null=True, max_length=5)

    def __str__(self):
        pass

class State(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(blank=False, max_length=50)
    
    def __str__(self):
        pass


class District(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    name = models.CharField(blank=False, max_length=50)
    
    def __str__(self):
        pass

class City(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    name = models.CharField(blank=False, max_length=50)
    
    def __str__(self):
        pass
