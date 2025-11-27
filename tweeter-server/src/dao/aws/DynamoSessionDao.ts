import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { AuthToken } from "tweeter-shared";
import { SessionDao } from "../abstract/SessionDao";

export class DynamoSessionDao implements SessionDao {
  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());
  readonly tablename = "session"
  readonly tokenAttr = "token"
  readonly timestampAttr = "timestamp"

  async get(token: string): Promise<any> {
    const item = await this.client.send(new GetCommand({
      TableName: this.tablename,
      Key: { [this.tokenAttr]: token }
    }))
    return item
  }
  async put(authToken: AuthToken): Promise<void> {
    // put token
    const item = {
      [this.tokenAttr]: authToken.token,
      [this.timestampAttr]: authToken.timestamp
    }
    await this.client.send(
      new PutCommand({
        TableName: this.tablename,
        Item: item
      })
    )
  }
  async update(token: string, timestamp: number): Promise<void> {
    await this.client.send(
      new UpdateCommand({
        TableName: this.tablename,
        Key: { [this.tokenAttr]: token },
        ExpressionAttributeValues: { ":time": timestamp },
        UpdateExpression:
        "SET " + this.timestampAttr + " = :time",
      })
    )
  }
  async delete(token: string): Promise<void> {
    await this.client.send(
      new DeleteCommand({
        TableName: this.tablename,
        Key: { [this.tokenAttr]: token }
      })
    )
  }
}