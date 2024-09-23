import { useState } from "react";

export default function useGeoLocation() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function getPosition() {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          setError(`Error Getting Location ${error}`);
          setIsLoading(false);
        }
      );
    }
  }

  return { location, getPosition, error, isLoading };
}
