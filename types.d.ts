import { Employee } from "@prisma/client";
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
