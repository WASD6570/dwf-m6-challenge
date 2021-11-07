import * as firebase from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "dwf-m6-desafio-6f595",
  private_key_id: "99a5cce776dcafd81228668c965546ef9a0ad662",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDah/pcUPKAUzKn\nFyHg7X02L2+jrdEj+H5ys/l9V7YIYqzHKjLJaaFd6Jmz/UXqQOLnwl8r6KWksrLE\nip9uToYTiVzDeHVI48Lkt399daPPYZ1vhJr0epdNHqw6Ue13Oz9xlO8Un0n7Mni4\nR1Z3LbJjLV2XkFU8ijy1HFL/Cn84CQpn50G5iDfqJA+TQzrc0lS7vJ4kmvAs67/+\nQvSCWEwOF8KcmD2V1HFmnFleBCZNXFt3fdZiWkO3f/Sjq7bZImvxlvn63rcz8Qxc\n6E5vdXdev3Nl4yedkX1ZYniuBiOEFf8edBHDtj2akmu6D7ZaAazr6YwIpYqDR0zP\njRnib92zAgMBAAECggEABJYEm69Z3MuM1+jVCIKzX/xlhrUnxcN56S+nCrRZLkUz\n2bIkWAm5czO7FgXjU7ks3y7lubwreGYE+Q7tAu7u7WCyllTkJorGakUCOJXMFuwL\ngRhH+t11E2STZLNCHSscd7u9ELJkZmXMFsHt1JkcPJc/zDshLstlNBUgwMLC92AJ\n7khnqOgfILWdmpNrZaRSfF3IguaxtRz5b1xamEkZhTQ8/BpMkxRelex/nbk0bZHt\ngx6YustpNq5wDf08qgMTRVJ8I0dEKG4fr6HDUV5VM7BxLjLrJAT9uRBHzskn5Qo3\n4ZSDL5GncmGBZ2hD9BBhzHCuI+h7XRBOcgoxza0NwQKBgQDyry1MZnkYlZV8GuOI\nM/vNZ1hohGPmwRh7b1J0G6UUQXc6rVgZ5nH0KHbykp8k6W5Uex664vq+zZ0icZOP\nwjhuktnn+Tgt2DwW9LvQZfnBjmA5A63KISflFcsdl9GixLOCyZ2qKgreTHctIJgx\nGMlor8xlkn4uIzNN7CY3htUSowKBgQDmhYnSVbSnTbe3TAHEFTjI+EQH1TnHEXvu\nASSBBtWgmYvlj1ZZiD6Qq6QPZJ5OrdJm1mEe9homllBBrJR+luaGSu3wTDdU7JfG\ni8Qz/gH+pr5eQDBmfn9b0kufQzHk+g8MkBRuiMLCshIaEiUecixhHn21jZ2Bz7KN\nKAd8wFTJsQKBgQCpRLQUuNi35AWaxWp0YsW7s9x/MfA4T/CSj8f0AiA3K55MyAFO\nN2S+BsdIVCo6ZbK1rBZ4Bb8c/G8gShXBTJdt0HG6kiK0H0FyRYsGRUpZzcOhoMZD\n2LJp37SHVJA8tnP6wkN9H8vq12y8hiKBBCffI9ct9WqbJaQwMolJa3sMfwKBgQCi\nzA4AIAzb1nP3G9NncgFPVJ1e1sPeBUf7Vo08HeKCb82viiHWSvS8YKsVP97Y+8LK\nY33lSrI/LApzxvh7yf/1OTd+a6Tr8cZiLlSazzkDaSiqETTdPVqeMw664855wesc\n2SfExAqfSvijtsrGDKWw1MK8k813XoHfVDStcnqukQKBgDEzAVws5N88NS3fwJGr\nfgfuqTuN7QG7XoBh/vIeXDsfGb7EssXOLYUeStRD7q2qVUl1qYqSExY8iE9m5+CB\nxfbL6cDCF/ejhLNfI8WVhfFHwRvTNg3ivSMtTZzq902R0ii2JToxXfifOr47gTSq\nOVeVjp3hibPUPtOrK5bJreok\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-tk7gw@dwf-m6-desafio-6f595.iam.gserviceaccount.com",
  client_id: "102048637018507806131",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tk7gw%40dwf-m6-desafio-6f595.iam.gserviceaccount.com",
};

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as any),
  databaseURL: "https://dwf-m6-desafio-6f595-default-rtdb.firebaseio.com",
});

const fireStore = firebase.firestore();

const rtdb = firebase.database();

export { fireStore, rtdb };
