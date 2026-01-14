'use client'

import { useForm } from "react-hook-form";
import { useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/dashboardlayout/page'
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'


export default function AddProduct() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [product, setProduct] = useState([])

  useEffect(() => {
    if (id) {
      getProductDetail()
    }
  }, [id])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm();


  const [previewImages, setPreviewImages] = useState([]);

  async function getProductDetail() {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/product/${id}`, {
        method: 'GET',
      })

      const result = await response.json()
      setProduct(result.productDeatil)
      setPreviewImages(result.productDeatil.images)
    } catch (error) {
      console.log(error)
    }

  }



  // handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setPreviewImages(files);

    // IMPORTANT: set files manually for react-hook-form
    setValue("images", files);
  };

  // remove image
  const removeImage = (index) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    setValue("images", updatedImages);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);

    data.images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/add`, {
        method: "POST",
        body: formData
      });

      await res.json();
      reset();
      setPreviewImages([]);
      toast("Product added successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DashboardLayout />

      <div className="m-20" style={{ paddingLeft: "270px" }}>
        <h2 className="text-3xl font-bold">Add Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="grid sm:grid-cols-2 gap-4">

            <input
              placeholder="Product Name"
              {...register("title", { required: "Title required" })}
              className="border p-3 rounded" /*value={product.title ? product.title:""}*/
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: "Price required" })}
              className="border p-3 rounded" /*value={product.price ? product.price:""}*/
            />

            <input
              placeholder="Category"
              {...register("category", { required: "Category required" })}
              className="border p-3 rounded" /*value={product.category ? product.category:""}*/
            />

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium">Product Gallery</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images.message}</p>
              )}
            </div>

            {/* Description */}
            <textarea
              rows="5"
              placeholder="Description"
              {...register("description", { required: true })}
              className="col-span-full border p-3 rounded" /*value={product.description ? product.description:""}*/
            />
          </div>

          {/* Image Preview */}

          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-6">
              {previewImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    //src={URL.createObjectURL(file)}

                    src={
                      typeof file === "string"
                        ? file // image URL from DB
                        : URL.createObjectURL(file) // File object
                    }

                    alt="preview"
                    className="h-32 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button className="bg-slate-900 text-white w-full py-3 mt-6 rounded">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
