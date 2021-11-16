import clsx from "clsx";

import { Form } from "../Form";
import { Button } from "../../button/Button";

import styles from "./AuthEmailForm.module.scss";
import { AuthEmailFormProps } from "./AuthEmailForm.types";

export const AuthEmailForm: React.FC<AuthEmailFormProps> = ({ className, autoFocus, onSubmit, isLoading }) => (
  <Form className={clsx(styles["auth-email-form"], className)} onSubmit={onSubmit}>
    <div className={styles["auth-email-form__inline-wrapper"]}>
      <div className={styles["auth-email-form__inline-wrapper--form"]}>
        <Form.TextInput
          autoFocus={autoFocus}
          label="Correo Electrónico"
          id="email"
          type="email"
          className={styles["auth-email-form__input"]}
        />
      </div>
      <div className={styles["auth-email-form__inline-wrapper--button"]}>
        <Button variant="outlined" fullWidth type="submit" isLoading={isLoading}>
          Ingresar
        </Button>
      </div>
    </div>
  </Form>
);
