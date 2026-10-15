from django.db import models


# ==========================================================
# BLOG CATEGORY
# ==========================================================

class BlogCategory(models.Model):

    name = models.CharField( max_length=100,unique=True)
    def __str__(self):
        return self.name


# ==========================================================
# BLOG
# ==========================================================

class Blog(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField()
    content = models.TextField()
    image = models.ImageField(upload_to="blogs/",null=True,blank=True)
    category = models.ForeignKey(BlogCategory,on_delete=models.CASCADE,related_name="blogs")
    author = models.CharField(max_length=150)
    date = models.DateField()
    tags = models.JSONField(default=list,blank=True)
    views = models.PositiveIntegerField(default=0)
    readTime = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-id"]