import React, { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const RunAutocompleteMultiple = ({
  options,
  labelKey,
  valueKey,
  defaultValues,
  onChange,
  disabled,
  isSingle,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const autocompleteContainerRef = useRef(null);
  const autocompleteMenuRef = useRef(null);

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (
      !selectedOptions.length &&
      defaultValues &&
      Array.isArray(defaultValues)
    ) {
      const selected = options.filter((option) => {
        return defaultValues.find(
          (defaultOption) => defaultOption[valueKey] === option[valueKey]
        );
      });
      setSelectedOptions(selected);
    }
  }, []);

  const showMenu = useCallback(() => {
    if (isMenuVisible) return;
    setIsMenuVisible(true);
    document.removeEventListener("click", handleClose);
    document.addEventListener("click", handleClose);
  }, [isMenuVisible]);
  const handleClose = useCallback((e) => {
    if (
      e &&
      (e.nativeEvent || e).path.includes(autocompleteContainerRef.current)
    ) {
      return;
    }
    setIsMenuVisible(false);

    document.removeEventListener("click", handleClose);
  }, []);

  const select = (option) => {
    const tmp = isSingle ? [option] : [...selectedOptions, option];
    setSelectedOptions(tmp);
    onChange && onChange(tmp);
  };

  const filteredView = (option) => {
    const isSelected = selectedOptions.includes(option);
    return (
      <div
        key={option[valueKey]}
        className={classnames("item", {
          selected: isSelected,
        })}
        onClick={() => (isSelected ? remove(option) : select(option))}
      >
        {option[labelKey]}
      </div>
    );
  };

  const filter = (query) => {
    if (!query) {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((item) => {
          return (
            item[labelKey]
              .toString()
              .toUpperCase()
              .indexOf((query || "").toUpperCase()) + 1
          );
        })
      );
    }
  };

  const remove = (option, event) => {
    if (event) {
      event.stopPropagation();
    }
    const tmp = [...selectedOptions];
    tmp.splice(tmp.indexOf(option), 1);
    setSelectedOptions(tmp);
  };
  return (
    <>
      <div
        className={classnames("autocomplete-main", {
          disabled,
        })}
      >
        <div
          ref={autocompleteContainerRef}
          className={classnames("autocomplete-field")}
          onClick={(e) => disabled || showMenu(e)}
        >
          <div className={classnames("tags-holder")}>
            {selectedOptions.map((option) => (
              <button
                key={option[valueKey]}
                type="button"
                className={classnames("tags", {
                  single: isSingle,
                })}
              >
                {option[labelKey]}
                {!isSingle && (
                  <span
                    className="remove-tag"
                    onClick={(e) => disabled || remove(option, e)}
                  >
                    ×
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="caret"></div>
          <div
            ref={autocompleteMenuRef}
            className={classnames("options-menu", {
              show: isMenuVisible,
            })}
          >
            <input
              type="text"
              className="autocomplete-search"
              placeholder="Search..."
              onChange={(e) => filter(e.target.value)}
            />
            <div className="filtered-options">
              {filteredOptions.map(filteredView)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

RunAutocompleteMultiple.propTypes = {
  options: PropTypes.array,
  defaultValues: PropTypes.array,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isSingle: PropTypes.bool,
};

export default RunAutocompleteMultiple;
