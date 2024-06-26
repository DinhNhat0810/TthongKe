import { LoginResType } from "@/type/auth.type";
import { normalizePath } from "../../utils/commom";
import { redirect } from "next/navigation";
import envConfig from "@/config";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;
const ACCESS_TOKEN_EXPIRED_STATUS = 403;

export const isClient = typeof window !== "undefined";

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body
    ? options?.body instanceof FormData
      ? options?.body
      : JSON.stringify(options?.body)
    : undefined;
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

  if (isClient) {
    const accessToken = JSON.parse(localStorage.getItem("user") || "{}")
      ?.token_info?.access_token;
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  let res: any;

  try {
    res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...baseHeaders,
        ...options?.headers,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZTgxNDNhOS04MGQzLTRkYWMtYjU3Yy00NDRjYTMyMDQ1NjYiLCJpZCI6IjI4MDc4IiwiZnVsbF9uYW1lIjoiQWRtaW4gTkNNIiwidXNlcm5hbWUiOiJhZG1pbiIsImRvbnZpX21hX2R2IjoiMDEwMzkzMDI3OS05OTkiLCJleHAiOjE3MTk3ODUwMTAsImlzcyI6ImhvYWRvbjIwMjRfdGVzdC5uYWNlbmNvbW0udm4iLCJhdWQiOiJob2Fkb24yMDI0X3Rlc3QubmFjZW5jb21tLnZuIn0.u6P3AdqkoVrMKY3obYVAazP9jyhJCiBAZEfH_gSmGgs",
        "ACCESS-CONTROL-ALLOW-ORIGIN": "*",
        "ACCESS-CONTROL-ALLOW-METHODS": "*",
      } as any,
      body,
      method,
    });
  } catch (error) {
    return new HttpError({
      status: 500,
      payload: {
        message: "Internal Server Error",
      },
    });
  }

  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };

  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient) {
        // if (!clientLogoutRequest) {
        //   clientLogoutRequest = fetch("/api/auth/logout", {
        //     method: "POST",
        //     body: JSON.stringify({ force: true }),
        //     headers: {
        //       ...baseHeaders,
        //     } as any,
        //   });
        //   try {
        //     await clientLogoutRequest;
        //   } catch (error) {
        //   } finally {
        //     localStorage.removeItem("user");
        //     clientLogoutRequest = null;
        //     location.href = "/login";
        //   }
        // }
      } else {
        const accessToken = (options?.headers as any)?.cookie.split(
          "Bearer "
        )[1];
        redirect(`/logout?accessToken=${accessToken}`);
      }
    } else if (res.status === ACCESS_TOKEN_EXPIRED_STATUS) {
    } else {
      return data;
    }
  }

  // // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
  if (isClient) {
    if (["auth/login"].some((item) => item === normalizePath(url))) {
      const newPayload: LoginResType = payload as LoginResType;
      console.log(newPayload, "newPayload");
    } else if ("auth/logout" === normalizePath(url)) {
    }
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
  // download(url: string) {
  //   if (isClient) {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const baseHeaders: {
  //       [key: string]: string;
  //     } = { Authorization: `Bearer ${accessToken}` };
  //     const fullUrl = url.startsWith("/")
  //       ? `${envConfig.NEXT_PUBLIC_API_ENDPOINT}${url}`
  //       : `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/${url}`;
  //     return fetch(fullUrl, {
  //       headers: baseHeaders,
  //       method: "GET",
  //     });
  //   }
  // },
};

export default http;
