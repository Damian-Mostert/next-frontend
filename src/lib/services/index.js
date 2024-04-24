"use client";

import { Popup } from "../components";
import { ServerRequest } from "./client/server-from-client";

import __load from "./__load";
import axios from "./init/axios";

const services = {};

const LOAD = __load;

Object.keys(LOAD).map((key) => {
  const sub = {};

  Object.keys(LOAD[key]).map((sub_key) => {
    sub[sub_key] = async function Service(
      input_data = undefined,
      popup_config = { success: false, error: false, fire: false },
      headers,
      cache = false,
      client,
    ) {
      if (popup_config.fire)
        Popup.fire({
          text: {
            icon: "loading",
          },
          bg: "blur",
        });
      const res = client
        ? await axios.post(LOAD[key][sub_key], input_data, {
          headers,
        }).then(res=>{
          return res.data
        }).catch(e=>{
          return {}
        })
        : await ServerRequest(LOAD[key][sub_key], input_data, {
            headers,
            cache
          });
      const response = typeof res == "object" ? res : {};
      console.log(response)
      response.success = true;
      response.error = false;
      if (response.status == "error") {
        if (popup_config.fire)
          Popup.fire(
            popup_config?.error
              ? popup_config?.error(response.message)
              : {
                  text: {
                    icon: "warn",
                    title: {
                      text: "Whoops!",
                      align: "center",
                    },
                    paragraphs: [response.message],
                  },
                  canClose: true,
                  timer: 3000,
                  bg: "blur",
                }
          );
        response.success = false;
        response.error = true;
      } else {
        if (popup_config.fire)
          Popup.fire(
            popup_config?.success
              ? popup_config?.success(response.message)
              : {
                  text: {
                    icon: "success",
                    title: {
                      text: "Success",
                      align: "center",
                    },
                    paragraphs: [response.message],
                  },
                  canClose: true,
                  timer: 3000,
                  bg: "blur",
                }
          );
      }
      return response;
    };
  });
  services[key] = sub;
});

export default services;