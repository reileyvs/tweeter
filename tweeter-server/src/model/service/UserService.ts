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
    this.authenticate(token)
    return this.userDao.getUser(alias)
  };
  async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    const user = this.userDao.login(alias, password)

    if (user === null) {
      throw new Error("Invalid alias or password");
    }
    const authToken = FakeData.instance.authToken

    return [user, this.sessionDao.addSession(authToken.token, authToken.timestamp)];
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

    const user = this.userDao.register(firstName, lastName, alias, password, imageStringBase64, imageFileExtension);

    if (user === null) {
      throw new Error("Invalid registration");
    }

    const authToken = FakeData.instance.authToken

    return [user, this.sessionDao.addSession(authToken.token, authToken.timestamp)];
  };
  async logout(authToken: AuthToken): Promise<void> {
    this.authenticate(authToken.token)
    this.sessionDao.clearSession(authToken.token)
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