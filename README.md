Uppics is a K8S-native microservice that only takes care of a simple thing: uploading pictures to your favourite storage.

It supports the following storages:
 * **Local storage**: it will just store the files to a mounted volume, up to you what you then want to do with that volume! 
 * **Google Cloud Storage**: it will store the files to google storage

# Concepts
You need to understand the following key concepts of uppics to use it correctly. 

#### Box
A Box is a container under which you will store some or all of your pictures. <br/>
You're not restricted to only one Box, you can define as many Boxs as you want. <br> 
Each Box needs a unique name, that you will define when creating it. <br>

#### Collection
A Collection is, as the name says, a collection of photos. <br>
Photos are always grouped in Collections. <br>
Each Collection has a name that you define. Names must be unique within a Box. 

# API Usage
Let's see now how you would use the apis.

uppics gives you the following APIS: <br>
```
POST /{box}/{collection}/pictures
```
This API will post a picture to the specified box and collection. If the box or the collection don't exist, it will create them. <br>
This API needs: 
 * Content-Type: multipart/form-data
 * The file to save
An example using CURL: 
```
curl --location --request POST 'http://host:port/box1/coll1/pictures' \
--form 'file=@/Users/foo/Desktop/my-pic.jpg'
```