import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { sleep } from "../../utitl/functions/misc";
import { NotificationStyle } from "./styles";

const NOTIFICATION_TIME_IN_MILISECONDS = 4000;

interface INotification {
  children: ReactElement[] | ReactElement;
}

interface INotificationContext {
  notification: (message: string) => void;
}

const NotificationContext = createContext<INotificationContext | null>(null);

const NotificationProvider: FC<INotification> = ({ children }) => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>();

  const notification = (message: string) => {
    setMessage(message);
    setIsShowing(true);
  };

  useEffect(() => {
    let timeout = null;
    if (isShowing) {
      timeout = setTimeout(() => {
        setIsShowing(false);
      }, NOTIFICATION_TIME_IN_MILISECONDS);
    }
    return () => (timeout = null);
  }, [isShowing]);

  const close = () => {
    setMessage(null);
    setIsShowing(false);
  };

  return (
    <NotificationContext.Provider value={{ notification }}>
      {children}
      {isShowing && <NotificationComponent message={message} close={close} />}
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;

const NotificationComponent: FC<{ message: string; close: () => void }> = ({
  message,
  close,
}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    if (isClosing) {
      sleep();
      close();
    }
  }, [isClosing]);
  return (
    <NotificationStyle className={isClosing ? "closing" : undefined}>
      <h1>{message}</h1>
      <button
        className="close-button"
        type={"button"}
        onClick={() => setIsClosing(true)}
      >
        x
      </button>
    </NotificationStyle>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
