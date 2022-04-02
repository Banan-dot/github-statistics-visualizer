import createComponentWithPrefix from "./createComponentWithPrefix";

const PageCard = createComponentWithPrefix("page-card", {
  displayName: "PageCard",
});
const PageCardHeader = createComponentWithPrefix("page-card__header", {
  displayName: "PageCard.Header",
});
const PageCardTitle = createComponentWithPrefix("page-card__header-title", {
  displayName: "PageCard.Title",
});
const PageCardBody = createComponentWithPrefix("page-card__body", {
  displayName: "PageCard.Body",
});

export default Object.assign(PageCard, {
  Header: PageCardHeader,
  Title: PageCardTitle,
  Body: PageCardBody,
});
