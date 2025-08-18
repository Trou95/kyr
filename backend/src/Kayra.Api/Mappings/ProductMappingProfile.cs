using AutoMapper;
using Kayra.Api.Dtos.Product;
using Kayra.Entities;

namespace Kayra.Api.Mappings;

public class ProductMappingProfile : Profile
{
    public ProductMappingProfile()
    {
        CreateMap<CreateProductRequest, Product>();

        CreateMap<UpdateProductRequest, Product>();

        CreateMap<Product, ProductResponse>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : null));
    }
}
