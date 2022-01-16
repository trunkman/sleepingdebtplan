import React from "react";
import { Link } from "react-router-dom";
// Style
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const CardWrapper = styled(CardContent)(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  width: 280,
}));

export const RankBookItem = ({
  book,
  rank,
  countStack,
  countRead,
}) => {

  return (
    <>
      <Card sx={{ p: 2 }}>
        <CardActionArea
          component={Link}
          to={`/books/${book.isbn}`}
        >
          <CardWrapper>
            <Typography gutterBottom variant="h5">
              <b>{rank}</b> 位
            </Typography>
            <CardMedia
              component="img"
              image={book.largeImageUrl}
              sx={{ width: 180, pb: 1 }}
              alt={'Book Image'}
            />
            <Typography variant="subtitle1" color="text.secondary">
              {book.title}
            </Typography>
            {countRead &&
              <Typography gutterBottom variant="h6">
                読了人数：<b>{countRead}</b>人
              </Typography>
            }
            {countStack &&
              <Typography gutterBottom variant="h6">
                積読人数：<b>{countStack}</b>人
              </Typography>
            }
          </CardWrapper>
        </CardActionArea>
      </Card>
    </>
  );
}