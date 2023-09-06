import { render, screen } from "@testing-library/react";
import { Formik } from "formik";

import logger from "@/utils/logger";

import ValidationMessage from "../ValidationMessage";
import FormInput from "../../FormInput";

describe("ValidationMessage", () => {
  it("renders the ValidationMessage component", () => {
    render(
      <Formik
        initialValues={{ input: "" }}
        initialErrors={{ input: "mock error" }}
        initialTouched={{ input: true }}
        onSubmit={() => logger("submit")}
        component={() => (
          <>
            <FormInput name="input" />
            <ValidationMessage name="input" />
          </>
        )}
      />
    );

    const errorMessage = screen.getByText(/mock error/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
