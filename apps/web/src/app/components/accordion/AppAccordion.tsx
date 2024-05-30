import { ReactNode } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  AccordionProps,
  AccordionSummaryProps
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface AppAccordionProps extends Omit<AccordionProps, 'children'> {
  id: string;
  title: string;
  children: ReactNode;
  summaryProps?: AccordionSummaryProps;
}

export const AppAccordion = ({
  id,
  children,
  title,
  summaryProps,
  ...rest
}: AppAccordionProps) => {

  return (
    <Accordion {...rest}>
      <AccordionSummary
        {...summaryProps}
        expandIcon={<ArrowDropDownIcon />}
        aria-controls={`app-accordion-${id}`}
        id={id}
      >
        <Typography
          variant="h6"
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
