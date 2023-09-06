import { render } from "@testing-library/react";
import { Formik } from "formik";

import { noop } from "@/utils/helpers";
import logger from "@/utils/logger";

import FormDropzone from "../FormDropzone";

describe("FormDropzone", () => {
  it("renders the FormDropzone component", () => {
    render(
      <Formik
        initialValues={{ file: "" }}
        onSubmit={() => logger("submit")}
        component={() => (
          <>
            <FormDropzone
              maxSize={10}
              onChange={noop}
              name="file"
              data-testid="file"
            />
          </>
        )}
      />
    );
  });
});
