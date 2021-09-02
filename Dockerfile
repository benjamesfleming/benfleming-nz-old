FROM alpine:3.13.2 AS thttpd

ARG THTTPD_VERSION=2.29

RUN apk add gcc musl-dev make

RUN wget http://www.acme.com/software/thttpd/thttpd-${THTTPD_VERSION}.tar.gz \
  && tar xzf thttpd-${THTTPD_VERSION}.tar.gz \
  && mv /thttpd-${THTTPD_VERSION} /thttpd

RUN cd /thttpd \
  && ./configure \
  && make CCOPT='-O2 -s -static' thttpd

RUN adduser -D static

FROM scratch

EXPOSE 3000

COPY --from=thttpd /etc/passwd /etc/passwd
COPY --from=thttpd /thttpd/thttpd /

USER static
WORKDIR /home/static

COPY ./dist .

CMD ["/thttpd", "-D", "-h", "0.0.0.0", "-p", "3000", "-d", "/home/static", "-u", "static", "-l", "-", "-M", "60"]
