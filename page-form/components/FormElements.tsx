import { IconType } from "react-icons/lib";
import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>; //For showing all elements in the sidebar
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>; //For showing selected element properties in the sidebar
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementType = {
  TextField: TextFieldFormElement,
};
