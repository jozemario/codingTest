// File modules
/* import AuthProvider from '../../../modules/auth-provider/api/auth-provider.entity';
import Brand from '../../../modules/client/brand/api/brand.entity';
import CelebritiesSocialMedias from '../../../modules/client/celebrity/api/celebrities-social-medias.entity';
import CelebritiesSports from '../../../modules/client/celebrity/api/celebrities-sports.entity';
import Celebrity from '../../../modules/client/celebrity/api/celebrity.entity';
import Country from '../../../modules/country/api/country.entity';
import Education from '../../../modules/education/api/education.entity';
import EmploymentType from '../../../modules/employment-type/api/employment-type.entity';
import Gender from '../../../modules/gender/api/gender.entity';
import Genre from '../../../modules/genre/api/genre.entity';
import Language from '../../../modules/language/api/language.entity';
import Location from '../../../modules/location/api/location.entity';
import MetricEvent from '../../../modules/metric-event/api/metric-event.entity';
import MetricEventType from '../../../modules/metric-event/api/metric-event-type.entity';
import Priority from '../../../modules/priority/api/priority.entity';
import Product from '../../../modules/client/product/api/product.entity';
import ProductionStudio from '../../../modules/client/production-studio/api/production-studio.entity';
import ProductsCategories from '../../../modules/client/product/api/products-sports.entity';
import Profession from '../../../modules/profession/api/profession.entity';
import RelationshipStatus from '../../../modules/relationship-status/api/relationship-status.entity';
import Role from '../../../modules/role/api/role.entity';
import SocialMedia from '../../../modules/social-media/api/social-media.entity';
import Sport from '../../../modules/sport/api/sport.entity';
import User from '../../../modules/client/user/api/user.entity';
import Video from '../../../modules/client/video/api/video.entity';
import VideoMetadata from '../../../modules/client/video/api/video-metadata.entity';
import VideoType from '../../../modules/video-type/api/video-type.entity';
import VideosBrandsEntity from '../../../modules/client/video/api/details/videos-brands.entity';
import VideosCelebritiesEntity from '../../../modules/client/video/api/details/videos-celebrities.entity';
import VideosGenres from '../../../modules/client/video/api/details/videos-genres.entity';
import VideosProduct from '../../../modules/client/video/api/details/videos-products.entity';
import VideosSports from '../../../modules/client/video/api/details/videos-sports.entity';
import VideoStatus from '../../../modules/client/video/api/video-status.entity';
import HomeType from '../../../modules/client/video/api/home/home-type.entity';
import VideoHomeStatus from '../../../modules/client/video/api/home/video-home-status.entity';
import GearHomeStatus from '../../../modules/sport/api/gear-home-status.entity';
import GearProductsHome from '../../../modules/sport/api/gear-products-home.entity';
import GearHome from '../../../modules/sport/api/gear-home.entity';
import HomeTitleStatus from '../../../modules/client/video/api/home/home-title-status.entity';
import HomeTitleType from '../../../modules/client/video/api/home/home-title-type.entity';
import HomeTitle from '../../../modules/client/video/api/home/home-title.entity';
import City from '../../../modules/city/api/city.entity';
import VideoThumbnail from '../../../modules/client/video/api/details/video-thumbnail.entity';
import VideoMainBanner from '../../../modules/client/video/api/details/video-main-banner.entity';
import VideoSubtitles from '../../../modules/client/video/api/details/video-subtitles.entity';
import VideoEpisode from '../../../modules/client/video/api/details/video-episode.entity';
import VideoSeason from '../../../modules/client/video/api/details/video-season.entity';
import VideoSeries from '../../../modules/client/video/api/details/video-series.entity';
import VideoVisibility from '../../../modules/client/video/api/details/video-visibility.entity';
import VideoAttribute from '../../../modules/client/video/api/details/video-attribute.entity';
import VideoAttributeRelation from '../../../modules/client/video/api/details/video-attribute-relation.entity';
import VideoRejectionReason from '../../../modules/client/video/api/video-rejection-reason.entity';
import VideoHighlight from '../../../modules/client/video/api/details/video-highlight.entity';
import VideoLongParagraph from '../../../modules/client/video/api/details/video-long-paragraph.entity';
import VideoProductTag from '../../../modules/client/video/api/details/videos-products-tags.entity';
import VideoLocationTag from '../../../modules/client/video/api/details/videos-locations-tags.entity';
import VideoCelebrityTag from '../../../modules/client/video/api/details/videos-celebrities-tags.entity';
import VideosLocationsEntity from '../../../modules/client/video/api/details/videos-locations.entity';
import VideoTrailer from '../../../modules/client/video/api/details/video-trailer.entity';
import VideoReleaseLaunch from '../../../modules/client/video/api/details/video-release-launch.entity';
import ProductStatus from '../../../modules/client/product/api/product-status.entity';
import ProductImage from '../../../modules/client/product/api/product-image.entity';
import VideoCelebrityComment from '../../../modules/client/video/api/details/video-celebrity-comment.entity';
import VideoBrandTag from '../../../modules/client/video/api/details/videos-brands-tags.entity';
import Device from '../../../modules/metric-event/api/device.entity';
import LocationStory from '../../../modules/location/api/stories/location-story.entity';
import LocationImage from '../../../modules/location/api/images/location-image.entity';
import ProductionStudioImage from '../../../modules/client/production-studio/api/images/production-studio-image.entity';
import CelebritiesFollowers from '../../../modules/client/celebrity/api/celebrities-followers.entity';
import BrandsFollowers from '../../../modules/client/brand/api/brands-followers.entity';
import ProductsWishlist from '../../../modules/client/product/api/products-wishlist.entity';
import LocationsFollowers from '../../../modules/location/api/locations-followers.entity';
import SportsFollowers from '../../../modules/sport/api/sports-followers.entity';
import VideosWatchlist from '../../../modules/client/video/api/videos-watchlist.entity';
import VideosLiked from '../../../modules/client/video/api/videos-liked.entity';
import WishlistFollowers from '../../../modules/client/product/api/wishlist_followers.entity';
import ProductsLiked from '../../../modules/client/product/api/products-liked.entity';
import ProductType from '../../../modules/client/product/api/product-type.entity';
import ProductSubtype from '../../../modules/client/product/api/product-subtype.entity'; */
import Post from '../../../modules/client/post/api/post.entity';

export const entities = [
    Post,
  /* AuthProvider,
  Brand,
  Celebrity,
  CelebritiesSocialMedias,
  CelebritiesSports,
  Country,
  City,
  Education,
  EmploymentType,
  Gender,
  Genre,
  Language,
  Location,
  MetricEvent,
  MetricEventType,
  Priority,
  Product,
  ProductsCategories,
  ProductType,
  ProductSubtype,
  ProductImage,
  ProductionStudio,
  Profession,
  RelationshipStatus,
  Role,
  SocialMedia,
  Sport,
  User,
  Video,
  VideoMetadata,
  VideosBrandsEntity,
  VideosCelebritiesEntity,
  VideoCelebrityComment,
  VideosGenres,
  VideosProduct,
  VideosSports,
  VideoType,
  VideoStatus,
  VideoThumbnail,
  VideoMainBanner,
  VideoHighlight,
  VideoLongParagraph,
  VideoSubtitles,
  HomeType,
  VideoHomeStatus,
  GearHomeStatus,
  GearProductsHome,
  GearHome,
  HomeTitle,
  HomeTitleType,
  HomeTitleStatus,
  VideoSeries,
  VideoSeason,
  VideoEpisode,
  VideoVisibility,
  VideoAttribute,
  VideoAttributeRelation,
  VideoRejectionReason,
  VideosLocationsEntity,
  VideoProductTag,
  VideoLocationTag,
  VideoCelebrityTag,
  VideoTrailer,
  VideoReleaseLaunch,
  ProductStatus,
  VideoBrandTag,
  LocationStory,
  LocationImage,
  Device,
  ProductionStudioImage,
  CelebritiesFollowers,
  BrandsFollowers,
  LocationsFollowers,
  SportsFollowers,
  VideosWatchlist,
  VideosLiked,
  WishlistFollowers,
  ProductsWishlist,
  ProductsLiked, */
];
