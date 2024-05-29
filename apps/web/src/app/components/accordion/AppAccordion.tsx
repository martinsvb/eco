import { ReactNode } from "react";
import { Accordion, AccordionSummary, Typography, AccordionDetails, AccordionProps } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface AppAccordionProps extends Omit<AccordionProps, 'children'> {
  id: string;
  title: string;
  children: ReactNode;
}

export const AppAccordion = ({
  id,
  children,
  title,
  ...rest
}: AppAccordionProps) => {

  return (
    <Accordion {...rest}>
      <AccordionSummary
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
