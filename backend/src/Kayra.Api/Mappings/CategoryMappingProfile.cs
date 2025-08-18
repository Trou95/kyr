using AutoMapper;
using Kayra.Api.Dtos.Category;
using Kayra.Entities;

namespace Kayra.Api.Mappings;

public class CategoryMappingProfile : Profile
{
    public CategoryMappingProfile()
    {
        CreateMap<CreateCategoryRequest, Category>();

        CreateMap<UpdateCategoryRequest, Category>();

        CreateMap<Category, CategoryResponse>()
            .ForMember(dest => dest.ProductCount, opt => opt.MapFrom(src => src.Products.Count));
    }
}
