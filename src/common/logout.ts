"use client"

export default function HandleLogout() {
  if (typeof window !== "undefined") {
    // Clear user session data
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  }

}
