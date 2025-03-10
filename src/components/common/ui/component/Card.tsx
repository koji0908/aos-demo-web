import { Button, CardContent, CardHeader, Card as MuiCard } from '@mui/material';
import React from 'react';

export type CardProps = {
  cardClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  title?: string;
  subheader?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

const DEFAULT_PADDING_CLASS = 'p-1';

export default function Card(props: CardProps) {
  const cardClass = props.cardClassName ? props.cardClassName : DEFAULT_PADDING_CLASS;
  const headerClass = props.headerClassName ? props.headerClassName : DEFAULT_PADDING_CLASS;
  const contentClass = props.contentClassName ? props.contentClassName : DEFAULT_PADDING_CLASS;

  return (
    <MuiCard className={cardClass}>
      <CardHeader
        className={headerClass}
        title={props.title}
        subheader={props.subheader}
        action={props.action}
      />
      <CardContent className={contentClass}>{props.children}</CardContent>
    </MuiCard>
  );
}
