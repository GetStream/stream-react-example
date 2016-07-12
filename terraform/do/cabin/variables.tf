variable "token" {
  description = "DO Token"
}

variable "region" {
  description = "DO Region"
  default = "sfo1"
}

variable "droplet_size" {
  description = "DO droplet size (slug)"
  default = "2gb"
}

variable "sshkey" {
  description = "Public ssh key (for Cabin user)"
}

variable "git_url" {
  description = "Git URL"
  default = "https://github.com/GetStream/stream-react-example.git"
}

#
# JWT
#

variable "JWT_SECRET" {
  description = "Environment variable JWT_SECRET"
  default = "ABC123"
}

#
# Mapbox
#

variable "MAPBOX_ACCESS_TOKEN" {
  description = "Environment variable MAPBOX_ACCESS_TOKEN"
  default = "ADD_VALUE_HERE"
}

#
# S3
#

variable "S3_KEY" {
  description = "Environment variable S3_KEY"
  default = "ADD_VALUE_HERE"
}

variable "S3_SECRET" {
  description = "Environment variable S3_SECRET"
  default = "ADD_VALUE_HERE"
}

variable "S3_BUCKET" {
  description = "Environment variable S3_BUCKET"
  default = "ADD_VALUE_HERE"
}

#
# Stream
#

variable "STREAM_APP_ID" {
  description = "Environment variable STREAM_APP_ID"
  default = "ADD_VALUE_HERE"
}

variable "STREAM_KEY" {
  description = "Environment variable STREAM_KEY"
  default = "ADD_VALUE_HERE"
}

variable "STREAM_SECRET" {
  description = "Environment variable STREAM_SECRET"
  default = "ADD_VALUE_HERE"
}

#
# Algolia
#

variable "ALGOLIA_APP_ID" {
  description = "Environment variable ALGOLIA_APP_ID"
  default = "ADD_VALUE_HERE"
}

variable "ALGOLIA_SEARCH_ONLY_KEY" {
  description = "Environment variable ALGOLIA_SEARCH_ONLY_KEY"
  default = "ADD_VALUE_HERE"
}

variable "ALGOLIA_API_KEY" {
  description = "Environment variable ALGOLIA_API_KEY"
  default = "ADD_VALUE_HERE"
}

#
# Keen
#

variable "KEEN_PROJECT_ID" {
  description = "Environment variable KEEN_PROJECT_ID"
  default = "ADD_VALUE_HERE"
}

variable "KEEN_WRITE_KEY" {
  description = "Environment variable KEEN_WRITE_KEY"
  default = "ADD_VALUE_HERE"
}

variable "KEEN_READ_KEY" {
  description = "Environment variable KEEN_READ_KEY"
  default = "ADD_VALUE_HERE"
}