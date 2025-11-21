import { addClientSchema } from "@/frontend/modules/clients/schema/add-client";
import {
  Client,
  Employee,
  Gender,
  SubscriptionType,
  Visitor,
} from "@prisma/client";
declare global {
  type Statistics = {
    cpuUsage: number;
    ramUsage: number;
    diskUsage: number;
  };

  type StaticData = {
    totalStorage: number;
    cpuModel: string;
    totalMemory: number;
  };
  type View = "CPU" | "RAM" | "STORAGE";

  type FrameWindowAction = "CLOSE" | "MAXIMIZE" | "MINIMIZE";

  interface EventMap {
    statistics: {
      request: Statistics;
      response: Statistics;
    };
    getStaticData: {
      request: void;
      response: StaticData;
    };
    changeView: {
      request: View;
      response: void;
    };
    sendFrameAction: {
      request: FrameWindowAction;
      response: void;
    };
    login: {
      request: { email: string; password: string };
      response: Omit<Employee, "password">;
    };
    addClient: {
      request: Omit<Client, "id" | "created_at" | "updated_at">;
      response: Client;
    };
    getClients: {
      request: void;
      response: Client[];
    };
    deleteClients: {
      request: number[];
      response: void;
    };
  }

  type UnsubscribeFunction = () => void;

  interface Window {
    electron: {
      subscribeStatistics: (
        callback: (statistics: Statistics) => void
      ) => UnsubscribeFunction;
      getStaticData: () => Promise<StaticData>;

      sendFrameAction: (payload: FrameWindowAction) => void;
      login: (credentials: {
        email: string;
        password: string;
      }) => Promise<Omit<Employee, "password">>;
      addClient: (clientData: addClientSchema) => Promise<Client>;
      getClients: () => Promise<Client[]>;
      deleteClients: (clientIds: number[]) => Promise<void>;
    };
  }
  interface ISuccessResponse<T> {
    success: true;
    data: T;
    message?: string;
  }

  interface IErrorResponse {
    success: false;
    message: string;
    errors?: { field?: string; message: string }[];
    code?: string;
  }

  type ApiResponse<T> = ISuccessResponse<T> | IErrorResponse;
}
