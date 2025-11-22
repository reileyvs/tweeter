import { Buffer } from "buffer";
import { AuthToken, User, FakeData } from "tweeter-shared";
import { StorageDao } from "../../dao/abstract/StorageDao";
import { UserDao } from "../../dao/abstract/UserDao";
import { SessionDao } from "../../dao/abstract/SessionDao";
import { SessionDaoFactory } from "../../dao/factory/SessionDaoFactory";
import { StorageDaoFactory } from "../../dao/factory/StorageDaoFactory";
import { UserDaoFactory } from "../../dao/factory/UserDaoFactory";

export class UserService {
  sessionDao: SessionDao
  storageDao: StorageDao
  userDao: UserDao

  constructor() {
    this.sessionDao = SessionDaoFactory.getSessionDao()
    this.storageDao = StorageDaoFactory.getStorageDao()
    this.userDao = UserDaoFactory.getUserDao()
  }

  async getUser(
    token: string,
    alias: string
  ): Promise<User | null> {
    //authenticate
    //UserDao.getUser(alias)
    this.authenticate(token)
    const user: User | null = this.userDao.getUser(alias)
    return FakeData.instance.findUserByAlias(alias);
  };
  async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    //UserDao.login(alias, password) -- get back a User or null
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, FakeData.instance.authToken];
  };
    async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]> {
    //user = UserDao.register()
    //authToken = SessionDao.addSession()

    // Not needed now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, FakeData.instance.authToken];
  };
  async logout(authToken: AuthToken): Promise<void> {
    //authenticate
    //sessionDao.clearSession()
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  };

  
  private authenticate(token: string): boolean {
    if(this.sessionDao.isAuthenticated(token)) {
      return true
    } else {
      throw new Error("Not authorized")
    }
  }
}