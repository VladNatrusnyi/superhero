import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const baseURL = `http://localhost:5000/`


export const superheroesApi = createApi({
  reducerPath: 'superheroesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),

  endpoints: builder => ({
    getAllSuperheroes: builder.query({
        query: ({page, limit}) => ({
          url: `superheroes?page=${page}&limit=${limit}`
        }),
      },
    ),

    getSuperhero: builder.query({
        query: ({id}) => ({
          url: `superheroes/${id}`
        }),
      },
    ),


    createSuperhero: builder.mutation({
      query: body => ({
        url: `superheroes`,
        method: 'POST',
        body
      })
    }),

    deleteSuperhero: builder.mutation({
      query: id => ({
        url: `superheroes/${id}`,
        method: 'DELETE'
      })
    }),


    updateSuperhero: builder.mutation({
      query: (data) => ({
        url: `superheroes/${data.id}`,
        method: 'PATCH',
        body: data.body
      })
    }),




    uploadImage: builder.mutation({
      query: body => ({
        url: `uploads`,
        method: 'POST',
        body
      })
    }),


    deleteImage: builder.mutation({
      query: filename => ({
        url: `${filename}`,
        method: 'DELETE'
      })
    }),

  }),
})



export const {
  useGetAllSuperheroesQuery,
  useGetSuperheroQuery,

  useDeleteImageMutation,
  useUploadImageMutation,
  useCreateSuperheroMutation,
  useDeleteSuperheroMutation,
  useUpdateSuperheroMutation,
} = superheroesApi
