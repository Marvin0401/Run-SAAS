import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import {
  deletePage,
  duplicatePage,
  updatePage,
  hidePage,
  setActivePage,
} from "@redux/slices/site";

import { BLOCK_TYPES } from "@constants";

import { addBlockData } from "@redux/slices/blockData";

import classnames from "classnames";
import { ReactSVG } from "react-svg";

import { useNotificationPopUp } from "@components/notification-pop-up/notification-pop-up.component";

import IconEdit from "@assets/images/cms/list_icon-edit.svg";
import IconDuplicate from "@assets/images/cms/list_icon-duplicate.svg";
import IconLink from "@assets/images/cms/list_icon-link.svg";
import IconTrash from "@assets/images/cms/list_icon-trash.svg";
import IconOpenButton from "@assets/images/open_button.svg";
import IconHide from "@assets/images/cms/list_icon-hide.svg";

const Page = ({
  data,
  children,
  canDuplicate,
  isNested = false,
  hasNestedChildren = false,
}) => {
  const { name, isDefault, id, externalLink, isHidden } = data;
  const [showExternalLinkInput, setShowExternalLinkInput] = useState(false);

  const { setPopUp } = useNotificationPopUp();

  const dispatch = useDispatch();

  const isActive = useSelector((state) => state.site.activePage?.id === id);

  const handleOnClickConfirm = (e) => {
    e.preventDefault();

    dispatch(deletePage(id));
    setPopUp(undefined);
  };

  const handleOnClickDelete = () => {
    setPopUp({
      title: "Delete?",
      children: (
        <>
          <p>
            You will lose any data related to this page. Are you sure you want
            to delete?
          </p>
          <button onClick={handleOnClickConfirm}>Confirm</button>
        </>
      ),
    });
  };

  const handleOnClickDuplicate = () => {
    const heroDataId = uuidv4();
    const block = {
      data: heroDataId,
      type: BLOCK_TYPES.HERO,
    };
    dispatch(
      addBlockData({
        block,
      })
    );

    dispatch(duplicatePage({ id, heroDataId }));
  };

  const handleOnClickEdit = () =>
    dispatch(setActivePage({ id, redirect: true }));

  const handleOnClickHide = () => dispatch(hidePage(id));

  const handleOnClickLink = () => setShowExternalLinkInput((x) => !x);

  const handleOnChangeProp = (updatedData) =>
    dispatch(updatePage({ ...data, ...updatedData }));

  return (
    <li id={id}>
      <div className={classnames("row_wrapper", { "is-active": isActive })}>
        {isDefault ? (
          <span className="input-like">{name}</span>
        ) : (
          <input
            type="text"
            value={name}
            onChange={(e) => handleOnChangeProp({ name: e.target.value })}
          />
        )}

        {hasNestedChildren && (
          <ReactSVG
            src={IconHide}
            className="svg"
            wrapper="span"
            onClick={handleOnClickHide}
          />
        )}
        {!isHidden && (
          <ReactSVG
            src={IconEdit}
            className="svg"
            onClick={handleOnClickEdit}
            wrapper="span"
          />
        )}
        <ReactSVG
          src={IconLink}
          className={classnames("svg", {
            selected: showExternalLinkInput || !!externalLink,
          })}
          wrapper="span"
          onClick={handleOnClickLink}
        />
        {!isDefault && canDuplicate && (
          <ReactSVG
            src={IconDuplicate}
            className="svg"
            onClick={handleOnClickDuplicate}
            wrapper="span"
          />
        )}
        {!(isDefault || hasNestedChildren) && (
          <ReactSVG
            src={IconTrash}
            className="svg"
            onClick={handleOnClickDelete}
            wrapper="span"
          />
        )}
        <ReactSVG
          beforeInjection={(svg) => svg.classList.add("handle")}
          src={IconOpenButton}
          className="svg drag_icon"
          wrapper="span"
        />
      </div>
      {showExternalLinkInput && (
        <div className="row_wrapper external-link">
          Links externally to:{" "}
          <input
            type="url"
            onChange={(e) =>
              handleOnChangeProp({ externalLink: e.target.value })
            }
            value={externalLink || ""}
          />
        </div>
      )}
      {!isNested && children}
    </li>
  );
};

Page.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
  canDuplicate: PropTypes.bool.isRequired,
  isNested: PropTypes.bool,
  hasNestedChildren: PropTypes.bool,
};

export default Page;
