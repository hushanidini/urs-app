export function cleanLocalStorage() {
    localStorage.removeItem('urs-authtoken');
    localStorage.removeItem('device_token');
  }

  export const generateUrlQueryString = data => {
    const query = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        query.append(key, value);
      }
    });
    return query.toString();
  };

  export function isImage(fileType) {
    const imageFielTypes = ['jpg', 'jpeg', 'png', 'gif'];
    return imageFielTypes.includes(fileType);
  }

  export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  