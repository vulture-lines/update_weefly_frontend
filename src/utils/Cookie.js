  const USER_SERVICE = import.meta.env.VITE_USER_SERVICE_URL;
export const getCookie = async (name) => {
  const res = await fetch(`${USER_SERVICE}/getcookie`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (res.status === 204) {
    return null;
  } else {
    const response = await res.json();
    console.log(response);
    return response;
  }
};

export const deleteCookie=async (name) => {
    const res = await fetch(`${USER_SERVICE}/deletecookie`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (res.status === 204) {
    return null;
  } else if(res.status==200) {
    return "deleted"
  }
}