variable "token" {
  description = "DO Token"
}

variable "region" {
  description = "DO Region"
}

variable "sshkey" {
  description = "Public ssh key (for Cabin user)"
}

#
# JWT
#

variable "JWT_SECRET" {
  description = "Environment variable JWT_SECRET"
}

#
# Mapbox
#

variable "MAPBOX_ACCESS_TOKEN" {
  description = "Environment variable MAPBOX_ACCESS_TOKEN"
}

#
# S3
#

variable "S3_KEY" {
  description = "Environment variable S3_KEY"
}

variable "S3_SECRET" {
  description = "Environment variable S3_SECRET"
}

variable "S3_BUCKET" {
  description = "Environment variable S3_BUCKET"
}

#
# Stream
#

variable "STREAM_APP_ID" {
  description = "Environment variable STREAM_APP_ID"
}

variable "STREAM_KEY" {
  description = "Environment variable STREAM_KEY"
}

variable "STREAM_SECRET" {
  description = "Environment variable STREAM_SECRET"
}

#
# Algolia
#

variable "ALGOLIA_APP_ID" {
  description = "Environment variable ALGOLIA_APP_ID"
}

variable "ALGOLIA_SEARCH_ONLY_KEY" {
  description = "Environment variable ALGOLIA_SEARCH_ONLY_KEY"
}

variable "ALGOLIA_API_KEY" {
  description = "Environment variable ALGOLIA_API_KEY"
}

#
# Keen
#

variable "KEEN_PROJECT_ID" {
  description = "Environment variable KEEN_PROJECT_ID"
}

variable "KEEN_WRITE_KEY" {
  description = "Environment variable KEEN_WRITE_KEY"
}

variable "KEEN_READ_KEY" {
  description = "Environment variable KEEN_READ_KEY"
}