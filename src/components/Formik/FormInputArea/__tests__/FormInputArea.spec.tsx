import { render, screen } from "@testing-library/react";
import { Formik } from "formik";

import logger from "@/utils/logger";

import FormInputArea from "../FormInputArea";

describe("FormInputArea", () => {
  it("renders the FormInputArea component", () => {
    render(
      <Formik
        initialValues={{ input: "" }}
        onSubmit={() => logger("submit")}
        component={() => (
          <>
            <FormInputArea
              name="input"
              placeholder="Input Placeholder"
              data-testid="input"
            />
          </>
        )}
      />
    );

    const inputValue = screen.getByTestId("input");
    const placeholder = screen.getByPlaceholderText("Input Placeholder");

    expect(placeholder).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
  });
});
