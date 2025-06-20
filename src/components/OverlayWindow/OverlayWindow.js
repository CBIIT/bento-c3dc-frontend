import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  DialogActions,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { setCookie, getCookie } from '../util';
import * as text from './OverlayText.json';
import DialogThemeProvider from './OverlayThemConfig';

const OverlayWindow = () => {
  const [open, setOpen] = useState(false);
  const PRIVACY_NOTICE_ACCEPTED_COOKIE = "privacyNoticeAccepted";

  const handleClose = () => {
    setOpen(false);
    setCookie(PRIVACY_NOTICE_ACCEPTED_COOKIE, "true");
  };

  useEffect(() => {
    if (!getCookie(PRIVACY_NOTICE_ACCEPTED_COOKIE)) {
      setOpen(true);
    }
  }, []);

  const content = text.content.map((item, index) => (
    <DialogContentText id="alert-dialog-description" key={`dialog-content-${index}`}>
      {item}
    </DialogContentText>
  ));
  const list = text.list.map((item, index) => (
    <ListItem key={`text-list-item-${index}`}>
      <ListItemIcon>
        <FiberManualRecord style={{ fontSize: 8 }} />
      </ListItemIcon>
      <ListItemText>
        {item}
      </ListItemText>
    </ListItem>
  ));

  return (
    <>
      <div>
        <DialogThemeProvider>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-title">
              Warning
            </DialogTitle>
            <Divider />
            <DialogContent>
              {content}
              {' By using this system, you understand and consent to the following: '}
              <List>
                {list}
              </List>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose}>
                Continue
              </Button>
            </DialogActions>
          </Dialog>
        </DialogThemeProvider>
      </div>
    </>
  );
};

export default OverlayWindow;
