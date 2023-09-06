import { render, screen } from "@testing-library/react";
import { Formik } from "formik";

import logger from "@/utils/logger";

import FormDropdown from "../FormDropdown";

describe("FormDropdown", () => {
  it("renders the FormInput component", () => {
    render(
      <Formik
        initialValues={{ input: "" }}
        onSubmit={() => logger("submit")}
        component={() => (
          <>
            <FormDropdown
              options={[
                {
                  id: "1",
                  label: "Question 1",
                },
                {
                  id: "2",
                  label: "Question 2",
                },
                {
                  id: "3",
                  label: "Question 3",
                },
              ]}
              name="dropdown"
              data-testid="dropdown"
            />
          </>
        )}
      />
    );

    const checkDefaultItemSelected = screen.getByText("Please Choose");
    expect(checkDefaultItemSelected).toBeInTheDocument();
  });
});
