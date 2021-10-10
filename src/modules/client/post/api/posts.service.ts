// NPM modules
import { Connection, MoreThanOrEqual } from 'typeorm';
//import urlJoin from 'url-join';

// File modules
import { getOrCreateConnection } from '../../../../common/lib/api/get-db-connection';
import Post from './post.entity';
import PostRepository  from './post.repository';
/*import User from './user.entity';
import Role from '../../../role/api/role.entity';
import { RoleEnum } from '../../../role/api/role.enum';
import { UserRepository } from './user.repository';
import MESSAGES from '../../../../common/lib/api/messages';
import CONFIG from '../../../../common/lib/api/config';
import { InputError, NotFoundError } from '../../../../common/lib/api/errors';
import { sendEmail } from '../../../../common/lib/api/mail';
import {
  compareHash,
  createRandomHexString,
  encodeHexString,
  getHash,
  removeNullKey,
} from '../../../../common/lib/api/util';
import forgotPasswordTemplate from '../../../../assets/email/ForgotPassTemplate';
import newUserTemplate from '../../../../assets/email/NewUserTemplate';
import Gender from '../../../gender/api/gender.entity';
import { BrandRepository } from '../../brand/api/brand.repository';
import { BrandsFollowersRepository } from '../../brand/api/brands-followers.repository';
import { LocationRepository } from '../../../location/api/location.repository';
import { LocationsFollowersRepository } from '../../../location/api/locations-followers.repository';
import {
  ProductRepository,
  ProductsWishlistRepository,
  WishlistFollowersRepository,
} from '../../product/api/product.repository';
import { SportRepository } from '../../../sport/api/sport.repository';
import { SportsFollowersRepository } from '../../../sport/api/sports-followers.repository';
import {
  VideoRepository,
  VideosLikedRepository,
  VideosWatchlistRepository,
} from '../../video/api/videos.repository';
import { CelebrityRepository } from '../../celebrity/api/celebrity.repository';
import { CelebritiesFollowersRepository } from '../../celebrity/api/celebrities-followers.repository';
import WishlistFollowers from '../../product/api/wishlist_followers.entity';
import logger from '../../../../common/lib/api/logger';
import { reMap } from '../../../../utils/back-end/mapper';
import {
  userImageResponseSchema,
  userProfileResponseSchema,
} from './user-response.schema';
import { MetricEventsService } from '../../../metric-event/api/metric-events.service';
import { StatsEnum } from '../../../metric-event/api/stats.enum';

// Initialization
const ITEMS_PER_PAGE = CONFIG.ITEMS_PER_PAGE;
const metricEventsService = new MetricEventsService();
 */
export default class PostsService {

    async getPosts (limit?: number) {
        const conn = await getOrCreateConnection();
        const postRepo = conn.getRepository<Post>("posts");//
        //.getCustomRepository(PostRepository);
        //const post = await postRepository.findOne(id);
        const posts = (await postRepo.find()).map(p => JSON.parse(JSON.stringify(p)));
        //await postRepository.find();
        console.log('getPosts: ',posts)
        return posts;
      };

    async getPost (id: number) {
        const conn = await getOrCreateConnection();
        const postRepo = conn.getRepository<Post>("posts");//
        //.getCustomRepository(PostRepository);
        //const post = await postRepository.findOne(id);
        const post = JSON.parse(JSON.stringify(await postRepo.findOneOrFail(id)));
        //await postRepository.find();
        console.log('getPost: ',id,post)
        return post;
      };

/*   async getFollowedBrands(userId, page, itemsPerPage, orderBy, direction) {
    const conn = await getOrCreateConnection();
    const brandsRepository = conn.getCustomRepository(BrandRepository);

    logger.debug(
      'Start listing followers brands for page %i, items per page %i, userId %i',
      page,
      itemsPerPage,
      userId,
    );

    const brands = await brandsRepository.getBrandsByFollower(
      userId,
      page,
      itemsPerPage,
      orderBy,
      direction,
    );

    logger.debug('End listing followers brands: %o', brands);

    return brands;
  }

  async getFollowedLocations(userId, page, itemsPerPage, orderBy, direction) {
    const conn = await getOrCreateConnection();
    const locationsRepository = conn.getCustomRepository(LocationRepository);

    logger.debug(
      'Start listing followers locations for page %i, items per page %i, userId %i',
      page,
      itemsPerPage,
      userId,
    );

    const locations = await locationsRepository.getLocationsByFollower(
      userId,
      page,
      itemsPerPage,
      orderBy,
      direction,
    );

    logger.debug('End listing followers locations: %o', locations);

    return locations;
  }

  async getFollowedWishlists(userId, page, itemsPerPage, orderBy, direction) {
    const conn = await getOrCreateConnection();
    const wishlistsFollowersRepository = conn.getCustomRepository(
      WishlistFollowersRepository,
    );

    logger.debug(
      'Start listing followers products for page %i, items per page %i, userId %i',
      page,
      itemsPerPage,
      userId,
    );

    const wishlists = await wishlistsFollowersRepository.getWishlistsByFollower(
      userId,
      page,
      itemsPerPage,
      orderBy,
      direction,
    );

    logger.debug('End listing followers products: %o', wishlists);

    const productsWishlistRepository = conn.getCustomRepository(
      ProductsWishlistRepository,
    );

    const wishlistsProducts = await Promise.all(
      wishlists[0].map(async wishlist => {
        if (wishlist.quantity > 0) {
          const product = await productsWishlistRepository.getWishlistProduct(
            wishlist.id,
          );
          return {
            ...wishlist,
            product: product.product,
          };
        }

        return wishlist;
      }),
    );

    const wishlistsResponse = [wishlistsProducts, wishlists[1]];

    logger.debug('End of fetching product for Wishlist: %o', wishlistsResponse);

    return wishlistsResponse;
  }

  async getWishlistProducts(
    wishlistId,
    page,
    itemsPerPage,
    orderBy,
    direction,
  ) {
    const conn = await getOrCreateConnection();
    const productRepository = conn.getCustomRepository(ProductRepository);

    logger.debug(
      'Start listing wishlist products for page %i, items per page %i, wishlistId %i',
      page,
      itemsPerPage,
      wishlistId,
    );

    const products = await productRepository.getProductsByWishlist(
      wishlistId,
      page,
      itemsPerPage,
      orderBy,
      direction,
    );

    logger.debug('End listing followers products: %o', products);

    return products;
  }

  async getFollowedSports(userId, page, itemsPerPage, orderBy, direction) {
    const conn = await getOrCreateConnection();
    const sportsRepository = conn.getCustomRepository(SportRepository);

    logger.debug(
      'Start listing followers sports for page %i, items per page %i, userId %i',
      page,
      itemsPerPage,
      userId,
    );

    const sports = await sportsRepository.getSportsByFollower(
      userId,
      page,
      itemsPerPage,
      orderBy,
      direction,
    );

    logger.debug('End listing followers sports: %o', sports);

    return sports;
  }

  async getFollowedCelebrities(userId, page, itemsPerPage, orderBy, direction) {
    const conn = await getOrCreateConnection();
    const celebrityRepository = conn.getCustomRepository(CelebrityRepository);

    logger.debug(
      'Start listing followers celebrities for page %i, items per page %i, userId %i',
      page,
      itemsPerPage,
      userId,
    );

    const celebrities = await celebrityRepository.getCelebritiesByFollower(
      userId,
      page,
      itemsPerPage,
      orderBy,
      direction,
    );

    logger.debug('End listing followers celebrities: %o', celebrities);

    return celebrities;
  }

  async getLikedVideos(userId, page, itemsPerPage, orderBy, direction) {
    const conn = await getOrCreateConnection();
    const videosRepository = conn.getCustomRepository(VideoRepository);

    logger.debug(
      'Start listing followers liked videos for page %i, items per page %i, userId %i',
      page,
      itemsPerPage,
      userId,
    );

    const videos = await videosRepository.getLikedVideosByFollower(
      userId,
      page,
      itemsPerPage,
      orderBy,
      direction,
    );

    logger.debug('End listing followers liked videos: %o', videos);

    return videos;
  }

  async getWatchListVideos(userId, page, itemsPerPage, orderBy, direction) {
    const conn = await getOrCreateConnection();
    const videosRepository = conn.getCustomRepository(VideoRepository);

    logger.debug(
      'Start listing followers watchlist videos for page %i, items per page %i, userId %i',
      page,
      itemsPerPage,
      userId,
    );

    const videos = await videosRepository.getWatchListVideosByFollower(
      userId,
      page,
      itemsPerPage,
      orderBy,
      direction,
    );

    logger.debug('End listing followers watchlist videos: %o', videos);

    return videos;
  }

  async saveFollowingBrand(userId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const brandsFollowersRepository = conn.getCustomRepository(
      BrandsFollowersRepository,
    );

    await brandsFollowersRepository.insert({
      userId,
      brand: { id: followingId },
    });
  }

  async deleteFollowingBrand(userId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const brandsFollowersRepository = conn.getCustomRepository(
      BrandsFollowersRepository,
    );

    await brandsFollowersRepository.delete({
      userId,
      brand: { id: followingId },
    });
  }

  async saveFollowingLocation(userId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const locationsFollowersRepository = conn.getCustomRepository(
      LocationsFollowersRepository,
    );

    await locationsFollowersRepository.insert({
      userId,
      location: { id: followingId },
    });
  }

  async saveFollowingCelebrity(userId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const celebritiesFollowersRepository = conn.getCustomRepository(
      CelebritiesFollowersRepository,
    );

    await celebritiesFollowersRepository.insert({
      userId,
      celebrity: { id: followingId },
    });
  }

  async deleteFollowingLocation(userId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const locationsFollowersRepository = conn.getCustomRepository(
      LocationsFollowersRepository,
    );

    await locationsFollowersRepository.delete({
      userId,
      location: { id: followingId },
    });
  }

  async getWishlist(wishlistId: number) {
    const conn = await getOrCreateConnection();
    const wishlistsFollowersRepository = conn.getCustomRepository(
      WishlistFollowersRepository,
    );

    return wishlistsFollowersRepository.findOne(wishlistId);
  }

  async saveFollowingWishlist(userId: number, wishlist: WishlistFollowers) {
    const conn = await getOrCreateConnection();
    const wishlistsFollowersRepository = conn.getCustomRepository(
      WishlistFollowersRepository,
    );

    wishlist.userId = userId;

    await wishlistsFollowersRepository.insert(wishlist);
  }

  async deleteFollowingWishlist(wishlistId: number) {
    const conn = await getOrCreateConnection();
    const wishlistsFollowersRepository = conn.getCustomRepository(
      WishlistFollowersRepository,
    );

    await wishlistsFollowersRepository.delete(wishlistId);
  }

  async saveWishlistProduct(wishlistId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const productsWishlistRepository = conn.getCustomRepository(
      ProductsWishlistRepository,
    );

    await productsWishlistRepository.insert({
      wishlistId,
      product: { id: followingId },
    });
  }

  async deleteWishlistProduct(wishlistId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const productsWishlistRepository = conn.getCustomRepository(
      ProductsWishlistRepository,
    );

    await productsWishlistRepository.delete({
      wishlistId,
      product: { id: followingId },
    });
  }

  async saveFollowingSport(userId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const sportsFollowersRepository = conn.getCustomRepository(
      SportsFollowersRepository,
    );

    await sportsFollowersRepository.insert({
      userId,
      sport: { id: followingId },
    });
  }

  async deleteFollowingSport(userId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const sportsFollowersRepository = conn.getCustomRepository(
      SportsFollowersRepository,
    );

    await sportsFollowersRepository.delete({
      userId,
      sport: { id: followingId },
    });
  }

  async deleteFollowingCelebrity(userId: number, followingId: number) {
    const conn = await getOrCreateConnection();
    const celebritiesFollowersRepository = conn.getCustomRepository(
      CelebritiesFollowersRepository,
    );

    await celebritiesFollowersRepository.delete({
      userId,
      celebrity: { id: followingId },
    });
  }

  async saveWatchListVideo(userId: number, videoId: number) {
    const conn = await getOrCreateConnection();
    const videosWatchlistVideosRepository = conn.getCustomRepository(
      VideosWatchlistRepository,
    );

    await videosWatchlistVideosRepository.insert({
      userId,
      video: { id: videoId },
    });
  }

  async deleteWatchListVideo(userId: number, videoId: number) {
    const conn = await getOrCreateConnection();
    const videosWatchlistVideosRepository = conn.getCustomRepository(
      VideosWatchlistRepository,
    );

    await videosWatchlistVideosRepository.delete({
      userId,
      video: { id: videoId },
    });
  }

  async saveLikedVideo(userId: number, videoId: number) {
    const conn = await getOrCreateConnection();
    const videosLikedRepository = conn.getCustomRepository(
      VideosLikedRepository,
    );

    await videosLikedRepository.insert({
      userId,
      video: { id: videoId },
    });
  }

  async deleteLikedVideo(userId: number, videoId: number) {
    const conn = await getOrCreateConnection();
    const videosLikedRepository = conn.getCustomRepository(
      VideosLikedRepository,
    );

    await videosLikedRepository.delete({
      userId,
      video: { id: videoId },
    });
  }

  // @desc  Create an image related to a user
  // @route POST /api/v1/users/:userId/images
  // @access Content Creator
  async saveImageProfile(userId: number, userImage) {
    const user = await getUserProfile(userId.toString());

    if (!user) {
      throw new NotFoundError([MESSAGES.en.LOCATION_NOT_FOUND]);
    }

    const conn = await getOrCreateConnection();
    const userRepository = conn.getCustomRepository(UserRepository);

    let userReq = new User();
    userReq = {
      ...user,
      profileImage: userImage,
    };
    const image = await userRepository.save(userReq);

    return reMap(
      userImageResponseSchema,
      Object.values(userImageResponseSchema),
      image,
    );
  }

  // @desc      Get total users count and growth
  // @route     GET /api/v1/users/count
  // @access    Admin
  async getUsersCountAndGrowth() {
    const conn = await getOrCreateConnection();
    const userRepository = conn.getCustomRepository(UserRepository);
    const count = await userRepository.count();
    // TODO calculate the growth percentage
    const growth = Math.random() * (70 - 10) + 10;

    const data = [
      {
        growth: await metricEventsService.calculateGrowth(StatsEnum.USERS),
      },
      count,
    ];
    return data;
  }
}

// @desc      Check email to see if it exists or not
// @route     POST /api/v1/auth/check-email/
// @access    Public
export const isEmailAvailable = async (email: string): Promise<boolean> => {
  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);

  const count = await userRepository.count({ email });
  if (count !== 0) {
    throw new InputError([MESSAGES.en.EMAIL_EXISTS]);
  }
  return true;
};

// @desc      Create a new user (With viewer role)
// @route     POST /api/v1/auth/signup/
// @access    Public
export const registerUser = async (
  email: string,
  password: string,
  fullName: string,
  gender: number | undefined = undefined,
): Promise<{ id: number }> => {
  await isEmailAvailable(email); // TODO Check why the replacement of this line cause an error

  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);

  const passwordHash = await getHash(password);

  let user = new User();
  user.email = email;
  user.password = passwordHash;
  user.fullName = fullName;
  user.isEmailValidated = false;
  user.isMobileValidated = false;
  user.roles = [{ id: RoleEnum.VIEWER } as Role];

  if (gender) {
    user.gender = { id: gender } as Gender;
  }

  await doEmailActivation(user);

  await userRepository.save(user);

  return { id: user.id };
};

// @desc      Send activation email
// @route     GET /api/v1/auth/get-activation-email/
// @access    Private
export const sendActivationEmail = async (id: number): Promise<void> => {
  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);

  const user = await userRepository.findOne(id);
  if (!user) {
    throw new NotFoundError([MESSAGES.en.USER_NOT_FOUND]);
  }

  if (user.isEmailValidated) {
    throw new InputError([MESSAGES.en.USER_ALREADY_ACTIVATED]);
  }

  await doEmailActivation(user);

  await userRepository.save(user);
};

// @desc      Activate account (Activate email)
// @route     GET /api/v1/auth/activate-account/:activationToken
// @access    Public
export const activateAccount = async (
  activationToken: string,
): Promise<void> => {
  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);

  const emailValidationCode = encodeHexString(activationToken);

  const user = await userRepository.findOne({
    emailValidationCode,
    emailValidationCodeExpire: MoreThanOrEqual(new Date()),
  });

  if (!user) {
    throw new InputError([MESSAGES.en.INVALID_ACCOUNT_ACTIVATION_TOKEN]);
  }

  if (user.isEmailValidated) {
    throw new NotFoundError([MESSAGES.en.USER_ALREADY_ACTIVATED]);
  }

  user.isEmailValidated = true;
  user.emailValidationCode = null;
  user.emailValidationCodeExpire = null;

  await userRepository.save(user);
};

// @desc      Check user's credentials (Used in NextAuth)
// @route     POST /api/v1/auth/login/ (This route is provided by NextAuth)
// @access    Public
export const loginCheck = async (
  email: string,
  password: string,
): Promise<User> => {
  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ email });
  if (!user) {
    throw new InputError([MESSAGES.en.WRONG_CREDENTIALS]);
  }

  const hashValidation = await compareHash(password, user.password);
  if (!hashValidation) {
    throw new InputError([MESSAGES.en.WRONG_CREDENTIALS]);
  }

  return user;
};

// @desc      Send forget password email to the user
// @route     POST /api/v1/auth/forgot-password
// @access    Public
export const forgetPassword = async (email: string) => {
  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ email });
  if (!user) {
    throw new NotFoundError([MESSAGES.en.EMAIL_NOT_FOUND]);
  }

  const resetPasswordToken = createRandomHexString(20);
  user.resetPasswordCode = encodeHexString(resetPasswordToken);

  const resetPasswordUrl = `${urlJoin(
    process.env.DOMAIN,
    CONFIG.FORGET_PASSWORD_PAGE_ADDRESS,
  )}?token=${resetPasswordToken}`;

  user.resetPasswordExpire = new Date(
    Date.now() + CONFIG.RESET_PASSWORD_LINK_EXPIRE_TIME,
  );

  // TODO Change policy and terms link
  await sendEmail({
    email: user.email,
    subject: MESSAGES.en.PASSWORD_RESET_EMAIL_SUBJECT,
    html: forgotPasswordTemplate(user.fullName, resetPasswordUrl, '#', '#'),
  });

  await userRepository.save(user);
};

// @desc      Reset password
// @route     POST /api/v1/auth/reset-password/:resetToken
// @access    Public
export const resetPassword = async (resetToken: string, password: string) => {
  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);

  const resetPasswordCode = encodeHexString(resetToken);

  const user = await userRepository.findOne({
    resetPasswordCode,
    resetPasswordExpire: MoreThanOrEqual(new Date()),
  });

  if (!user) {
    throw new InputError([MESSAGES.en.INVALID_RESET_PASSWORD_TOKEN]);
  }

  user.password = await getHash(password);
  user.resetPasswordCode = null;
  user.resetPasswordExpire = null;

  await userRepository.save(user);
};

export const updateUserProfile = async (
  userData: User,
  userId: string,
): Promise<User | { error: string }> => {
  try {
    const connection: Connection = await getOrCreateConnection();
    let userRepository = connection.getCustomRepository(UserRepository);

    let userRequest = await userRepository.findOne(userId);

    if (!userRequest) {
      throw new NotFoundError([MESSAGES.en.USER_NOT_FOUND]);
    }

    userRepository.merge(userRequest, userData);

    return await userRepository.save(userRequest);
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<User> => {
  try {
    const connection: Connection = await getOrCreateConnection();
    let userRepo = connection.getCustomRepository(UserRepository);
    const userResponse = await userRepo.findOne(userId, {
      relations: [
        'country',
        'education',
        'employment',
        'relationshipStatus',
        'gender',
      ],
    });
    return reMap(
      userProfileResponseSchema,
      Object.values(userProfileResponseSchema),
      userResponse,
    );
  } catch (error) {
    throw error;
  }
};

export const saveUser = async (user: User): Promise<User> => {
  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);
  return userRepository.save(user);
};

export const getUser = async (id: number): Promise<User> => {
  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);
  const user = await userRepository.findOne(id);
  return user;
};

export const isEmailExists = async (email: string): Promise<boolean> => {
  const conn = await getOrCreateConnection();
  const userRepository = conn.getCustomRepository(UserRepository);

  const count = await userRepository.count({ email });
  if (count !== 0) {
    return false;
  }
  return true;
};

const doEmailActivation = async (user: User): Promise<void> => {
  const emailActivationToken = createRandomHexString(20);
  user.emailValidationCode = encodeHexString(emailActivationToken);
  const accountActivateUrl = `${urlJoin(
    process.env.DOMAIN,
    CONFIG.ACTIVATION_PAGE_ADDRESS,
  )}?token=${emailActivationToken}&name=${user.fullName}`;

  user.emailValidationCodeExpire = new Date(
    Date.now() + CONFIG.EMAIL_VALIDATION_LINK_EXPIRE_TIME,
  );

  // TODO  Change policy and terms link
  await sendEmail({
    email: user.email,
    subject: MESSAGES.en.EMAIL_ACTIVATION_SUBJECT,
    html: newUserTemplate(user.fullName, accountActivateUrl, '#', '#'),
  });*/
};
 